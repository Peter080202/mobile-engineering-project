import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput, Alert } from 'react-native';
import Constants from 'expo-constants';
import { flashcardDecks } from './flashcards';

// type definitions for the object that we use in this application

// a flashcard has a front and a back
interface FlashCard {
  front: string;
  back: string;
}

// a flash card deck has a name and flashcards
interface CardDeck {
  name: string;
  cards: FlashCard[];
}

// a type for a callback function, that does not take any arguments
type Callback = () => void;

// a callback for saving a deck
type DeckCallback = (arg: CardDeck) => void;

// a component rendering the front of a flashcard
const Front = ({ front, onFlip }: { front: string; onFlip: Callback }) => (
  <View>
    <Text style={styles.paragraph}>{front}</Text>
    <Button title="flip" onPress={onFlip} />
  </View>
);

// a component rendering the back of a flashcard
// when we show the back of a card, we expect the user to tell us if their guess was right or wrong
// then, we should:
// 1) record the guess
//    we need to think about how to do this
// 2) go to the next card
//    component responsible for this is: Deck component
// 3) make sure we are showing the front of the next card, not the back
//    component responsible for this: Card component
const Back = ({
  back,
  onTrueGuess,
  onFalseGuess,
}: {
  back: string;
  onTrueGuess: Callback;
  onFalseGuess: Callback;
}) => (
  <View>
    <Text style={styles.paragraph}>{back}</Text>
    <View style={{ flexDirection: 'row' }}>
      <Button title="right" onPress={onTrueGuess} />
      <Button title="wrong" onPress={onFalseGuess} />
    </View>
  </View>
);

// a component rendering a flashcard, keeping track of whether it is flipped or not
const Card = ({
  card,
  onTrueGuess,
  onFalseGuess,
}: {
  card: FlashCard;
  onTrueGuess: Callback;
  onFalseGuess: Callback;
}) => {
  const [showFront, setShowFront] = useState<boolean>(true);

  const flip = () => setShowFront(!showFront);

  // whenever a guess is recorded, we both flip, and go to the next card
  const recordTrueGuess = () => {
    flip();
    onTrueGuess();
  };

  const recordFalseGuess = () => {
    flip();
    onFalseGuess();
  };

  return (
    <View>
      {showFront ? (
        <Front front={card.front} onFlip={flip} />
      ) : (
        <Back
          back={card.back}
          onTrueGuess={recordTrueGuess}
          onFalseGuess={recordFalseGuess}
        />
      )}
    </View>
  );
};

type statisticsProps = {
  cardsReviewed: number;
  cardsLeft: number;
  correctGuesses: number;
  incorrectGuesses: number;
};

const Statistics = ({
  cardsReviewed,
  cardsLeft,
  correctGuesses,
  incorrectGuesses,
}: statisticsProps) => {
  return (
    <View>
      <Text>Cards reviewed: {cardsReviewed}</Text>
      <Text>Cards left: {cardsLeft}</Text>
      <Text>Correct Guesses: {correctGuesses}</Text>
      <Text>Incorrect Guesses: {incorrectGuesses}</Text>
    </View>
  );
};

// a component rendering a deck of card, showing one card at a time
// the deck is also responsible for tracking guesses and re-ordering itself
const Deck = ({ deck, onSave }: { deck: CardDeck; onSave: DeckCallback }) => {
  const [index, setIndex] = useState<number>(0);
  const [cards, setCards] = useState<FlashCard[]>(deck.cards);
  const [showStatistics, setShowStatistics] = useState<Boolean>(false);
  const [guessedRight, setGuessedRight] = useState<FlashCard[]>([]);
  const [guessedWrong, setGuessedWrong] = useState<FlashCard[]>([]);
  const currentCard = cards[index];

  const restart = () => {
    const newCards = reorderCards();
    const newDeck = { ...deck, cards: newCards };
    setCards(newCards);
    setGuessedRight([]);
    setGuessedWrong([]);
    setIndex(0);
    onSave(newDeck);
  };

  // we still need to take care of the index growing too large
  // but we will take care of this later
  const nextCard = () => {
    if (index < deck.cards.length - 1) {
      setIndex(index + 1);
    } else {
      restart();
    }
  };

  // we add the card to the stack of cards we got right, and go to the next card
  const recordTrueGuess = () => {
    const newGuessedRight = [currentCard, ...guessedRight];
    //console.log("right cards", newGuessedRight)
    setGuessedRight(newGuessedRight);
    nextCard();
    //console.log("cards left", unseenCards())
  };

  // we add the card to the stack of cards we got wrong, and go to the next card
  const recordFalseGuess = () => {
    const newGuessedWrong = [currentCard, ...guessedWrong];
    //console.log("wrong cards", newGuessedWrong)
    setGuessedWrong(newGuessedWrong);
    nextCard();
  };

  const logCards = () => {
    console.log('right cards', guessedRight);
    console.log('wrong cards', guessedWrong);
    console.log('cards left', unseenCards());
  };

  // return all the cards after the index
  const unseenCards = (): FlashCard[] => {
    return cards.slice(index);
  };

  const reorderCards = (): FlashCard[] => {
    return [...guessedWrong, ...unseenCards(), ...guessedRight];
  };

  logCards();

  return (
    <View>
      <Card
        card={currentCard}
        onTrueGuess={recordTrueGuess}
        onFalseGuess={recordFalseGuess}
      />
      <Button title="restart" onPress={restart} />
      {showStatistics ? (
        <>
          <Statistics
            cardsReviewed={index}
            cardsLeft={cards.length - index}
            correctGuesses={guessedRight.length}
            incorrectGuesses={guessedWrong.length}
          />
          <Button
            title="hide statistics"
            onPress={() => setShowStatistics(!showStatistics)}
          />
        </>
      ) : (
        <Button
          title="show statistics"
          onPress={() => setShowStatistics(!showStatistics)}
        />
      )}
    </View>
  );
};

type DeckEditorProps ={
  deck: CardDeck;
  setSelected: any;
}

enum EditOptions {
  EditDeckName,
  EditCards,
  AddCard
}

const DeckEditor = ({deck, setSelected} : DeckEditorProps) => {
  const [editMode, setEditMode] = useState<EditOptions>(null);
  const [index, setIndex] = useState<number>(0);
  const [deckName, setDeckName] = useState(deck.name);
  const [front, setFront] = useState(deck.cards[index].front);
  const [back, setBack] = useState(deck.cards[index].back);

  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");

  const setCard = () => {
    setFront(deck.cards[index].front);
    setBack(deck.cards[index].back);
  }

  useEffect(() => {
    setCard();
  }, [index])

  const saveDeckName = () => {
    deck.name = deckName;
    Alert.alert("Saved deck name!")
  }

  const selectCard = (nextCard: boolean) => {
    nextCard ? setIndex(index + 1) : setIndex(index - 1);
  }

  const saveCard = () => {
    deck.cards[index].front = front;
    deck.cards[index].back = back;
    Alert.alert("Saved card!")
  }

  const deleteCard = () => {
    const newIndex = index >= deck.cards.length - 1 ? index - 1 : index;
    deck.cards.splice(index, 1);
    setIndex(newIndex);
    setCard();
    Alert.alert("Deleted card!")
  }

  const saveNewCard = () => {
    const newCard : FlashCard = {front: newFront, back: newBack}; 
    deck.cards = [...deck.cards, newCard];
    Alert.alert("Saved new card!")
  }

  return (
    <View>
      {
        editMode === null && (
          <>
            <Button title="Edit deck name" onPress={() => setEditMode(EditOptions.EditDeckName)}/>
            <View style={styles.space} />
            <Button title="Edit cards" onPress={() => { setCard(); setEditMode(EditOptions.EditCards); }}/>
            <View style={styles.space} />
            <Button title="Add cards" onPress={() => setEditMode(EditOptions.AddCard)}/>
            <View style={styles.space} />
            <Button title="go back" onPress={() => setSelected(null)} /> 
          </>
        )
      }
      {
        editMode === EditOptions.EditDeckName && (
          <View>
            <Text>Deck name:</Text>
            <View style={styles.space} />
            <TextInput style={styles.textfield} value={deckName} onChangeText={setDeckName} multiline={true} numberOfLines={4}/>
            <View style={styles.space} />
            <Button title="save deck name" color="#009E60" onPress={()=> saveDeckName()} disabled={deckName === deck.name}/>
          </View>
        )
      }
      {
        editMode === EditOptions.EditCards && (
          <View>
            <Text>Front:</Text>
            <View style={styles.space} />
            <TextInput style={styles.textfield} value={front} onChangeText={setFront} multiline={true} numberOfLines={4}/>
            <View style={styles.space} />
            <Text>Back:</Text>
            <View style={styles.space} />
            <TextInput style={styles.textfield} value={back} onChangeText={setBack} multiline={true} numberOfLines={4}/>
            <View style={styles.space} />
            <Button title="previous card" onPress={()=> selectCard(false)} disabled={index <= 0}/>
            <View style={styles.space} />
            <Button title="next card" onPress={()=> selectCard(true)} disabled={index >= deck.cards.length - 1}/>
            <View style={styles.space} />
            <Button title="save card" color="#009E60" onPress={() => saveCard()} disabled={deck.cards[index].front === front && deck.cards[index].back === back}/>
            <View style={styles.space} />
            <Button title="delete card" color="#FF0000" onPress={() => deleteCard()}/>
          </View>
        )
      }
      {
        editMode === EditOptions.AddCard && (
          <View>
            <Text>Add a card</Text>
            <View style={styles.space} />
            <Text>Front:</Text>
            <View style={styles.space} />
            <TextInput style={styles.textfield} value={newFront} onChangeText={setNewFront} multiline={true} numberOfLines={4}/>
            <View style={styles.space} />
            <Text>Back:</Text>
            <View style={styles.space} />
            <TextInput style={styles.textfield} value={newBack} onChangeText={setNewBack} multiline={true} numberOfLines={4}/>
            <View style={styles.space} />
            <Button title="save new card" color="#009E60" onPress={() => saveNewCard()} disabled={newFront === "" || newBack === ""}/>
          </View>
        )
      }
      {
        editMode !== null && (
          <>
            <View style={styles.space} />
            <Button title="go back" onPress={() => setEditMode(null)} /> 
          </>
        )
      }
      
      
    </View>
  );
}

// a component that allows to pick a deck of cards
// we are missing a way to let this component know that
// a deck of cards has been re-ordered
// this is what the saveDeck function does
const SelectDeck = ({ decks }: { decks: CardDeck[] }) => {
  const [selected, setSelected] = useState<CardDeck | null>(null);
  const [cardDecks, setCardDecks] = useState<CardDeck[]>(decks);
  const [ editModeSelected, setEditModeSelected] = useState<Boolean>(false);

  const saveDeck = (deck: CardDeck) => {
    console.log('saving deck', deck);
    const newDecks = cardDecks.map((cd: CardDeck) => {
      if (cd.name === deck.name) {
        return deck;
      } else {
        return cd;
      }
    });
    setCardDecks(newDecks);
  };

  return selected ? (
    <View>
      {editModeSelected ? 
        <DeckEditor deck={selected} setSelected={setSelected}/> : 
        <>
          <Deck deck={selected} onSave={saveDeck} />
          <Button title="go back" onPress={() => setSelected(null)} />
        </>
      }
    </View>
  ) : (
    <View>
      {cardDecks.map((d : CardDeck) => (
        <View>
          <Text>{d.name}</Text>
          <View style={styles.space} />
          <Button title="select" onPress={() => { setSelected(d); setEditModeSelected(false); }} />
          <View style={styles.space} />
          <Button title="edit" onPress={() => { setSelected(d); setEditModeSelected(true); }} />
          <View style={styles.space} />
        </View>
      ))}
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <SelectDeck decks={flashcardDecks} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    margin: 10
  },
  space: {
    width: 20,
    height: 10,
  },
  textfield: {
    padding: 4,
    fontSize: 14,
    borderColor: "black",
    borderWidth: 1
  }
});
