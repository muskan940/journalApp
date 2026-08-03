export const MOOD_COLORS = {
  HAPPY: '#E8B94A',
  SAD: '#5E8FCB',
  ANGRY: '#B4472F',
  ANXIOUS: '#9370B5'
}

export function moodLabel(sentiment) {
  if (!sentiment) return null
  return sentiment.charAt(0) + sentiment.slice(1).toLowerCase()
}
