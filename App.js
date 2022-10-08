import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from "./physics";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { Entypo } from '@expo/vector-icons';

export default function App() {

  const [Running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [Record, setRecord] = useState(0);
  const [soundController, setSound] = React.useState();

  const playSound = async () => {
    if (soundController) {
      soundController.unloadAsync();
      setSound(undefined);
      return;
    }
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/Track.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  const getRecord = async () => {
    try {
      const value = await AsyncStorage.getItem('Record');
      if (value !== null) {
        setRecord(Number(value));
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setRunning(false);
    getRecord();
  }, [])

  const afterGameOver = async () => {
    setRunning(false)
    gameEngine.stop();
    setCurrentPoints(0);
    if (currentPoints > Record) {
      const jsonRecord = JSON.stringify(currentPoints);
      await AsyncStorage.setItem('Record', jsonRecord);
      getRecord();
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require("./assets/background.png")} resizeMode="cover" style={styles.background}>
        <StatusBar style="auto" hidden={true} />
          <Text
            style={{
              textAlign: "center",
              fontSize: 40,
              fontWeight: "bold",
              position: "relative",
              top: 30,
              elevation: 1,
            }}
          >
            {currentPoints}
          </Text>

        <GameEngine
          ref={(ref) => { setGameEngine(ref) }}
          style={{
            position: "absolute", left: 0, top: 0, right: 0, bottom: 0,
          }}
          entities={entities()}
          systems={[Physics]}
          running={Running}
          onEvent={(e) => {
            switch (e.type) {
              case "game_over":
                afterGameOver();
                break;
              case "new_point":
                setCurrentPoints(currentPoints + 1);
                break;
            }
          }}
        >
        </GameEngine>

        {!Running &&
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 20,
                top: 20,
                elevation: 1,
              }}
              onPress={() => {
                playSound();
              }}
            >
              {soundController ? <Entypo name="sound" size={35} color="black" /> :
                <Entypo name="sound-mute" size={35} color="black" />}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: "black", borderRadius: 5, padding: 20, }}
              onPress={() => {
                setCurrentPoints(0);
                setRunning(true);
                gameEngine.swap(entities())
              }}
            >
              <Text style={{ color: "white", fontSize: 25, }}>Start Game</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 30, marginTop: 25, }}>Record : {Record}</Text>
          </View>
        }
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  }
});
