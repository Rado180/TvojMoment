import { supabase } from './supabase'

export type Category = { id: string; name: string; display_order: number }

export type Challenge = {
  id: string
  title: string
  description: string | null
  image_url: string | null
  total_days: number
  display_order: number | null
}

export type Meditation = {
  id: string
  category_id: string
  challenge_id: string | null
  day_number: number | null
  title: string
  description: string | null
  audio_url: string | null
  image_url: string | null
  is_premium: boolean
  duration_seconds: number | null
  mood_tag: string | null
}

const MEDITATION_FIELDS =
  'id, category_id, challenge_id, day_number, title, description, audio_url, image_url, is_premium, duration_seconds, mood_tag'

export async function getCategories() {
  const { data, error } = await supabase.from('hm_categories').select('id, name, display_order').order('display_order')
  if (error) throw error
  return data as Category[]
}

export async function getCategory(id: string) {
  const { data, error } = await supabase.from('hm_categories').select('id, name, display_order').eq('id', id).single()
  if (error) throw error
  return data as Category
}

export async function getChallenges() {
  const { data, error } = await supabase
    .from('hm_challenges')
    .select('id, title, description, image_url, total_days, display_order')
    .order('display_order', { nullsFirst: false })
  if (error) throw error
  return data as Challenge[]
}

export async function getChallenge(id: string) {
  const { data, error } = await supabase
    .from('hm_challenges')
    .select('id, title, description, image_url, total_days, display_order')
    .eq('id', id)
    .single()
  if (error) throw error
  return data as Challenge
}

// Samostatné meditácie v kategórii (bez tých, ktoré patria do výzvy).
export async function getStandaloneMeditations(categoryId: string) {
  const { data, error } = await supabase
    .from('hm_meditations')
    .select(MEDITATION_FIELDS)
    .eq('category_id', categoryId)
    .is('challenge_id', null)
    .order('title')
  if (error) throw error
  return data as Meditation[]
}

export async function getChallengeMeditations(challengeId: string) {
  const { data, error } = await supabase
    .from('hm_meditations')
    .select(MEDITATION_FIELDS)
    .eq('challenge_id', challengeId)
    .order('day_number')
  if (error) throw error
  return data as Meditation[]
}

export async function getMeditation(id: string) {
  const { data, error } = await supabase.from('hm_meditations').select(MEDITATION_FIELDS).eq('id', id).single()
  if (error) throw error
  return data as Meditation
}
