export default function CreateDatabase(dbSize) {
  let allDecks = []
  //
  //  Build shuffled Decks
  //
  allDecksCreate()
  //
  //  Session Storage
  //
  store()
  //
  //  Return value
  //
  return allDecks
  // --------------------------------------------------------------------------------
  // Create shuffled Decks array
  // --------------------------------------------------------------------------------
  function allDecksCreate() {
    for (let deckNum = 0; deckNum < dbSize; deckNum++) {
      // if (deckNum % 100000 === 0) console.log(`Start Deck ${deckNum}:`)

      const deck_in = [
        'S02',
        'S03',
        'S04',
        'S05',
        'S06',
        'S07',
        'S08',
        'S09',
        'S10',
        'S11',
        'S12',
        'S13',
        'S14',
        'H02',
        'H03',
        'H04',
        'H05',
        'H06',
        'H07',
        'H08',
        'H09',
        'H10',
        'H11',
        'H12',
        'H13',
        'H14',
        'D02',
        'D03',
        'D04',
        'D05',
        'D06',
        'D07',
        'D08',
        'D09',
        'D10',
        'D11',
        'D12',
        'D13',
        'D14',
        'C02',
        'C03',
        'C04',
        'C05',
        'C06',
        'C07',
        'C08',
        'C09',
        'C10',
        'C11',
        'C12',
        'C13',
        'C14'
      ]

      //
      //  Create Deck
      //
      allDecks[deckNum] = []
      //
      //  Shuffle deck
      //
      const deck_shuffled = deckShuffle(deck_in)
      //
      //  Split deck into hands
      //
      deckSplit(deck_shuffled, deckNum)
    }
  }
  // --------------------------------------------------------------------------------
  // Shuffle deck
  // --------------------------------------------------------------------------------
  function deckShuffle(deck) {
    for (let card = deck.length - 1; card > 0; card--) {
      const cardswap = Math.floor(Math.random() * (card + 1))
      ;[deck[card], deck[cardswap]] = [deck[cardswap], deck[card]]
    }
    return deck
  }
  // --------------------------------------------------------------------------------
  // Split
  // --------------------------------------------------------------------------------
  function deckSplit(deck_shuffled, deckNum) {
    //
    //  Split deck into hands
    //
    for (let handNum = 0; handNum < 4; handNum++) {
      const sliceStart = handNum * 13
      const hand = deck_shuffled.slice(sliceStart, sliceStart + 13)
      hand.sort()
      hand.reverse()
      //
      //  Analyse hand
      //
      handAnalysis(deckNum, handNum, hand)
    }
  }
  // --------------------------------------------------------------------------------
  // Analyse each hand
  // --------------------------------------------------------------------------------
  function handAnalysis(deckNum, handNum, hand) {
    //
    //  Create Deck/Hands
    //
    allDecks[deckNum][handNum] = []
    //
    //  Define the Hand Object
    //
    const objHand = CreateHandObj()
    //
    //  Process each card
    //
    for (let cardNum = 0; cardNum < hand.length; cardNum++) {
      //
      //  High Card Points
      //
      const card = hand[cardNum]
      const cardid = parseInt(card.substring(1))
      let cardValue = cardid - 10
      if (cardValue < 0) cardValue = 0
      objHand.hand_hcp = objHand.hand_hcp + cardValue
      //
      //  Suit count
      //
      const cardSuit = card.substring(0, 1)
      let suitNum
      cardSuit === 'S'
        ? (suitNum = 0)
        : cardSuit === 'H'
        ? (suitNum = 1)
        : cardSuit === 'D'
        ? (suitNum = 2)
        : (suitNum = 3)
      //
      //  Populate the suits
      //
      objHand.suits[suitNum].cards.push(cardid)
      objHand.suits[suitNum].cards_cnt++
      objHand.suits[suitNum].cards_hcp = objHand.suits[suitNum].cards_hcp + cardValue
    }
    //
    //  Populate the Deck/Hand with the Hand Object
    //
    allDecks[deckNum][handNum] = objHand
  }
  // --------------------------------------------------------------------------------
  // Create Empty Hand object
  // --------------------------------------------------------------------------------
  function CreateHandObj() {
    //
    //  Define the Hand Object
    //
    const objHand = {
      hand_hcp: 0,
      suits: []
    }
    //
    //  Populate the suits empty
    //
    for (let suitNum = 0; suitNum < 4; suitNum++) {
      objHand.suits[suitNum] = {
        cards: [],
        cards_cnt: 0,
        cards_hcp: 0
      }
    }
    //
    //  Return Object
    //
    return objHand
  }
  // --------------------------------------------------------------------------------
  // debugging session storage
  // --------------------------------------------------------------------------------
  function store() {
    //
    //Save first part of database
    //
    const sampleNum = 30
    let sampleDecks
    dbSize < sampleNum ? (sampleDecks = allDecks) : (sampleDecks = allDecks.slice(0, sampleNum))
    sessionStorage.setItem('sampleDecks', JSON.stringify(sampleDecks))
  }
  // --------------------------------------------------------------------------------
}
