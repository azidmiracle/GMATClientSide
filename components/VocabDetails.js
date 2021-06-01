import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import { Transition, Transitioning } from "react-native-reanimated";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" duration={1000} />
    <Transition.Change />
    <Transition.Out type="fade" duration={1000} />
  </Transition.Together>
);

const VocabDetails = (props) => {
  const SERVER_URL = "https://gmat-vocab-server.herokuapp.com/";
  const ref = React.useRef();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [isClicked, setClick] = useState(0);
  const [isExpanded, setExpanded] = useState(0);
  const [synonyms, setSynonym] = useState("");
  const [example, setExample] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  //count how many clicks. if it is even, meaning the is expanded
  //this will toggle the hide/show of the details
  function countOfClicks() {
    setCount(count + 1);
    const numOfEvenClick = count % 2;
    if (numOfEvenClick == 0) {
      setExpanded(1);
    } else {
      setExpanded(0);
    }
  }

  function loadDetails(word) {
    countOfClicks();

    if (isClicked == 0) {
      setClick(1);
      startLoading();
      fetch(`${SERVER_URL}word/${word}`)
        .then((response) => response.json())
        .then((json) => {
          const DATA_DETAILS = json.results;
          const PRONOUNCE = json.pronunciation
          const PRONOUNCEALL=JSON.stringify(PRONOUNCE)
          //console.log(DATA_DETAILS[0]["examples"][0]);
          setData(DATA_DETAILS);
          setPronunciation(PRONOUNCEALL==undefined?PRONOUNCE:PRONOUNCEALL)
           setSynonym(DATA_DETAILS[0]["synonyms"].join());
          setExample(DATA_DETAILS[0]["examples"][0]); 
          //console.log(typeof PRONUNCE)
        })
        .catch((error) => console.log(error));
    }
  }

  const toggleModal = (word) => {
    setModalVisible(!isModalVisible);
    loadSentences(word);
  };

  return (
    <Transitioning.View ref={ref} transition={transition}>
      <TouchableOpacity
        style={[
          styles.container,
          isClicked ? styles.btn_isVisitedColor : styles.btn_isNotVisitedColor,
        ]}
        onPress={() => {
          ref.current.animateNextTransition();
          loadDetails(props.title);
        }}
      >
        <View>
          <View>
            <Text style={styles.title}>{props.title.toUpperCase()}</Text>
          </View>
          <View>
            {loading ? (
              <ActivityIndicator
                //visibility of Overlay Loading Spinner
                visible={loading}
                size="large"
                color="#ffc2d4"
              />
            ) : (
              <>
                <View
                  style={isExpanded ? styles.details_show : styles.details_hide}
                >
                   <View style={styles.pronunciation}>
                  <Text >
                          ({pronunciation})
                        </Text>
                  </View>
                   
                  <Text style={styles.subheader}>Definition</Text>

                   {data.map((result, index) => {
                    return (
                      <View style={styles.details}>
                        <Text style={styles.partOfSpeech}>
                          {result.partOfSpeech}:{" "}
                        </Text>
                        <Text style={styles.definition}>
                          {result.definition}
                        </Text>
                      </View>
                    );
                  })} 
                  <View>
                    <Text style={styles.subheader}>Synonyms</Text>
                    <Text>{synonyms}</Text>
                  </View>
                  <View>
                    <Text style={styles.subheader}>Example</Text>
                    <Text>{example}</Text>
                  </View> 
                  {/* <View style={styles.moreSentence}>
              <Button title={isModalVisible ? "Hide sentences"  : "Show more sentences" }onPress={toggleModal(props.title)} />
              <View style={isModalVisible ? styles.details_show : styles.details_hide}>
             
                <View style={{ flex: 1 }}>
                  <Text>Hello!</Text>
                 
                </View>
             
              </View>
            </View> */}
                </View>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Transitioning.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7bf1a8",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  title: {
    fontSize: 25,
  },
  details_show: {
    flex: 1,
    flexWrap: "wrap",
    display: "inline-block",
    backgroundColor: "#ffc2d4",
  },
  details_hide: {
    display: "none",
  },
  details: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
    fontSize: 15,
  },
  partOfSpeech: {},
  subheader: {
    fontWeight: "bold",
  },
  pronunciation:{
    fontWeight: "bold",
    fontStyle: "italic",
    padding: 10,
  }
  ,
  definition: {
    fontStyle: "italic",
  },
  btn_isVisitedColor: {
    backgroundColor: "#ff7aa2",
  },
  btn_isNotVisitedColor: {
    backgroundColor: "#7bf1a8",
  },
  moreSentence: {
    padding: 20,
  },
});

export default VocabDetails;
