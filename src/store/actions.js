import * as api from '@/services'

const createDeck = async ({ dispatch, commit }, { cards, rotationCard }) => {
  dispatch('isLoading', true)
  const { deck_id: deckId } = await api.createDeck(cards, rotationCard)
  await api.createPile(deckId, 'table', cards)
  await api.createPile(deckId, 'rotation', [rotationCard])
  commit('SET_DECK', { deckId, cards, rotationCard })
  dispatch('isLoading', false)
  return deckId
}

const getDeck = async ({ dispatch, commit }, deckId) => {
  dispatch('isLoading', true)
  const tablePile = await api.getPile(deckId, 'table')
  const rotationCardPile = await api.getPile(deckId, 'rotation')

  const cards = tablePile.piles.table.cards
  const rotationCard = rotationCardPile.piles.rotation.cards[0]

  const result = { deckId, cards, rotationCard }
  commit('SET_DECK', result)
  dispatch('isLoading', false)
  return result
}

const isLoading = ({ commit }, value) => {
  commit('SET_LOADING', value)
}

export default {
  createDeck,
  getDeck,
  isLoading
}
