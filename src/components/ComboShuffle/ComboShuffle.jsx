export default function ComboShuffle() {
  const dbSize = 300
  let h1_cards = []
  let h2_cards = []
  let h3_cards = []
  let h4_cards = []
  let h1_hcp = []
  let h2_hcp = []
  let h3_hcp = []
  let h4_hcp = []
  let h1_s = []
  let h2_s = []
  let h3_s = []
  let h4_s = []
  let h1_h = []
  let h2_h = []
  let h3_h = []
  let h4_h = []
  let h1_d = []
  let h2_d = []
  let h3_d = []
  let h4_d = []
  let h1_c = []
  let h2_c = []
  let h3_c = []
  let h4_c = []
  //
  //  Build shuffled decks
  //
  deckCreate()
  //
  //  Create deck analysis
  //
  decksAnalysis()
  //
  //  Session Storage
  //
  store()
  // --------------------------------------------------------------------------------
  // Create shuffled decks arrays
  // --------------------------------------------------------------------------------
  function deckCreate() {
    for (let i = 0; i < dbSize; i++) {
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
      //  Shuffle deck
      //
      const deck_wrk = deckShuffle(deck_in)
      //
      //  Split deck into hands h1..h4
      //
      const h1 = deck_wrk.slice(0, 13)
      h1.sort()
      h1.reverse()

      const h2 = deck_wrk.slice(13, 26)
      h2.sort()
      h2.reverse()

      const h3 = deck_wrk.slice(26, 39)
      h3.sort()
      h3.reverse()

      const h4 = deck_wrk.slice(39, 52)
      h4.sort()
      h4.reverse()
      //
      //  Save each hand
      //
      h1_cards.push(h1)
      h2_cards.push(h2)
      h3_cards.push(h3)
      h4_cards.push(h4)
    }
  }
  // --------------------------------------------------------------------------------
  // Shuffle deck
  // --------------------------------------------------------------------------------
  function deckShuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }
  // --------------------------------------------------------------------------------
  // Analyse ALL decks
  // --------------------------------------------------------------------------------
  function decksAnalysis() {
    for (let deckNum = 0; deckNum < dbSize; deckNum++) {
      //
      //  Process each Deck
      //
      deckAnalysis(deckNum)
    }
  }
  // --------------------------------------------------------------------------------
  // Analyse deck
  // --------------------------------------------------------------------------------
  function deckAnalysis(deckNum) {
    //
    //  Process each hand
    //
    handAnalysis(deckNum, h1_cards[deckNum], 1)
    handAnalysis(deckNum, h2_cards[deckNum], 2)
    handAnalysis(deckNum, h3_cards[deckNum], 3)
    handAnalysis(deckNum, h4_cards[deckNum], 4)
  }
  // --------------------------------------------------------------------------------
  // Analyse each hand
  // --------------------------------------------------------------------------------
  function handAnalysis(deckNum, hand, handNum) {
    let hcp = 0
    let s = 0
    let h = 0
    let d = 0
    let c = 0
    for (let card = 0; card < hand.length; card++) {
      //
      //  High Card Points
      //
      const cardValue = parseInt(hand[card].substring(1)) - 10
      if (cardValue > 0) hcp = hcp + cardValue
      //
      //  Suit count
      //
      const cardSuit = hand[card].substring(0, 1)
      switch (cardSuit) {
        case 'S':
          s++
          break
        case 'H':
          h++
          break
        case 'D':
          d++
          break
        case 'C':
          c++
          break
        default:
          break
      }
    }
    //
    //  Update hcp array
    //
    if (s > 8) console.log(deckNum, hand, handNum)

    switch (handNum) {
      case 1:
        h1_hcp[deckNum] = hcp
        h1_s[deckNum] = s
        h1_h[deckNum] = h
        h1_d[deckNum] = d
        h1_c[deckNum] = c
        break
      case 2:
        h2_hcp[deckNum] = hcp
        h2_s[deckNum] = s
        h2_h[deckNum] = h
        h2_d[deckNum] = d
        h2_c[deckNum] = c
        break
      case 3:
        h3_hcp[deckNum] = hcp
        h3_s[deckNum] = s
        h3_h[deckNum] = h
        h3_d[deckNum] = d
        h3_c[deckNum] = c
        break
      case 4:
        h4_hcp[deckNum] = hcp
        h4_s[deckNum] = s
        h4_h[deckNum] = h
        h4_d[deckNum] = d
        h4_c[deckNum] = c
        break
      default:
        break
    }
  }
  // --------------------------------------------------------------------------------
  // debugging session storage
  // --------------------------------------------------------------------------------
  function store() {
    if (dbSize > 1000) return

    sessionStorage.setItem('h1_cards', JSON.stringify(h1_cards))
    sessionStorage.setItem('h2_cards', JSON.stringify(h2_cards))
    sessionStorage.setItem('h3_cards', JSON.stringify(h3_cards))
    sessionStorage.setItem('h4_cards', JSON.stringify(h4_cards))
    sessionStorage.setItem('h1_hcp', JSON.stringify(h1_hcp))
    sessionStorage.setItem('h2_hcp', JSON.stringify(h2_hcp))
    sessionStorage.setItem('h3_hcp', JSON.stringify(h3_hcp))
    sessionStorage.setItem('h4_hcp', JSON.stringify(h4_hcp))
    sessionStorage.setItem('h1_s', JSON.stringify(h1_s))
    sessionStorage.setItem('h1_h', JSON.stringify(h1_h))
    sessionStorage.setItem('h1_d', JSON.stringify(h1_d))
    sessionStorage.setItem('h1_c', JSON.stringify(h1_c))
    sessionStorage.setItem('h2_s', JSON.stringify(h2_s))
    sessionStorage.setItem('h2_h', JSON.stringify(h2_h))
    sessionStorage.setItem('h2_d', JSON.stringify(h2_d))
    sessionStorage.setItem('h2_c', JSON.stringify(h2_c))
    sessionStorage.setItem('h3_s', JSON.stringify(h3_s))
    sessionStorage.setItem('h3_h', JSON.stringify(h3_h))
    sessionStorage.setItem('h3_d', JSON.stringify(h3_d))
    sessionStorage.setItem('h3_c', JSON.stringify(h3_c))
    sessionStorage.setItem('h4_s', JSON.stringify(h4_s))
    sessionStorage.setItem('h4_h', JSON.stringify(h4_h))
    sessionStorage.setItem('h4_d', JSON.stringify(h4_d))
    sessionStorage.setItem('h4_c', JSON.stringify(h4_c))
  }
  // --------------------------------------------------------------------------------
}
