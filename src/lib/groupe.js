import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabase';

// Sprints en groupe — faire le même sprint à plusieurs, via un code à
// partager. Pas de compte : chaque appareil a un identifiant local, et
// l'appartenance à un groupe est mémorisée par sprint.

const APPAREIL_KEY = '@skillsprint_appareil_id';
const GROUPES_KEY = '@skillsprint_groupes'; // { [sprintId]: { groupeId, code, participantId, pseudo } }
const CARACTERES_CODE = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sans O/0, I/1 — ambigus à l'oral

function genererUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function genererCode() {
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += CARACTERES_CODE[Math.floor(Math.random() * CARACTERES_CODE.length)];
  }
  return code;
}

export async function obtenirAppareilId() {
  let id = await AsyncStorage.getItem(APPAREIL_KEY);
  if (!id) {
    id = genererUuid();
    await AsyncStorage.setItem(APPAREIL_KEY, id);
  }
  return id;
}

async function lireGroupesLocaux() {
  const data = await AsyncStorage.getItem(GROUPES_KEY);
  return data ? JSON.parse(data) : {};
}

async function ecrireGroupeLocal(sprintId, info) {
  const groupes = await lireGroupesLocaux();
  groupes[sprintId] = info;
  await AsyncStorage.setItem(GROUPES_KEY, JSON.stringify(groupes));
}

export async function obtenirGroupeLocal(sprintId) {
  const groupes = await lireGroupesLocaux();
  return groupes[sprintId] || null;
}

export async function quitterGroupeLocal(sprintId) {
  const groupes = await lireGroupesLocaux();
  delete groupes[sprintId];
  await AsyncStorage.setItem(GROUPES_KEY, JSON.stringify(groupes));
}

export async function creerGroupe(sprintId, pseudo) {
  const appareilId = await obtenirAppareilId();
  const code = genererCode();

  const { data: groupe, error: erreurGroupe } = await supabase
    .from('groupes')
    .insert({ code, sprint_id: sprintId })
    .select()
    .single();
  if (erreurGroupe) throw erreurGroupe;

  const { data: participant, error: erreurParticipant } = await supabase
    .from('participants')
    .insert({ groupe_id: groupe.id, appareil_id: appareilId, pseudo })
    .select()
    .single();
  if (erreurParticipant) throw erreurParticipant;

  const info = { groupeId: groupe.id, code: groupe.code, participantId: participant.id, pseudo };
  await ecrireGroupeLocal(sprintId, info);
  return info;
}

// Rejoint un groupe par son code. Retourne aussi sprintId du groupe pour
// que l'écran appelant vérifie que ça correspond au sprint affiché.
export async function rejoindreGroupe(code, pseudo) {
  const appareilId = await obtenirAppareilId();

  const { data: groupe, error: erreurGroupe } = await supabase
    .from('groupes')
    .select()
    .eq('code', code.toUpperCase().trim())
    .single();
  if (erreurGroupe || !groupe) throw new Error('Code introuvable.');

  const { data: participant, error: erreurParticipant } = await supabase
    .from('participants')
    .upsert(
      { groupe_id: groupe.id, appareil_id: appareilId, pseudo },
      { onConflict: 'groupe_id,appareil_id' }
    )
    .select()
    .single();
  if (erreurParticipant) throw erreurParticipant;

  const info = {
    groupeId: groupe.id,
    code: groupe.code,
    participantId: participant.id,
    pseudo,
  };
  await ecrireGroupeLocal(groupe.sprint_id, info);
  return { ...info, sprintId: groupe.sprint_id };
}

export async function chargerGroupe(groupeId) {
  const { data: participants, error: erreurParticipants } = await supabase
    .from('participants')
    .select('id, pseudo, appareil_id')
    .eq('groupe_id', groupeId)
    .order('rejoint_le', { ascending: true });
  if (erreurParticipants) throw erreurParticipants;

  const { data: completions, error: erreurCompletions } = await supabase
    .from('completions')
    .select('participant_id, jour')
    .eq('groupe_id', groupeId);
  if (erreurCompletions) throw erreurCompletions;

  return participants.map((p) => ({
    ...p,
    joursCompletes: completions.filter((c) => c.participant_id === p.id).map((c) => c.jour),
  }));
}

export async function enregistrerCompletionGroupe(sprintId, jourNumero) {
  const info = await obtenirGroupeLocal(sprintId);
  if (!info) return;
  await supabase.from('completions').upsert(
    {
      participant_id: info.participantId,
      groupe_id: info.groupeId,
      jour: jourNumero,
    },
    { onConflict: 'participant_id,jour' }
  );
}

export function ecouterGroupe(groupeId, onChangement) {
  const channel = supabase
    .channel(`groupe-${groupeId}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'participants', filter: `groupe_id=eq.${groupeId}` },
      onChangement
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'completions', filter: `groupe_id=eq.${groupeId}` },
      onChangement
    )
    .subscribe();
  return () => supabase.removeChannel(channel);
}
