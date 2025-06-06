import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
  Modal,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import BackButton from "../components/BackButton";
import StartButton from "../components/StartButton";
import monumentsData from "../components/MonumentsData";
import bgImg from "../assets/bgImg.jpg";

const { width, height } = Dimensions.get("window");

export default function StarterScreen() {
  const navigation = useNavigation();
  const [selectedMonument, setSelectedMonument] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dificulty, setDificulty] = useState(null);

  const openModal = (monument) => {
    setSelectedMonument(monument);
    setModalVisible(true);
    getDificulty(monument);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMonument(null);
  };

  const getDificulty = (monument) => {
    if (monument.name.length < 10) {
      setDificulty("EASY");
    } else if (monument.name.length >= 10 && monument.name.length < 15) {
      setDificulty("MEDIUM");
    } else {
      setDificulty("HARD");
    }
  };

  return (
    <ImageBackground
      source={bgImg}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}
      resizeMode="cover"
    >
      <ScrollView className="flex-1 min-w-full">
        <View>
          <SafeAreaView className="flex-1 justify-between min-h-screen items-start">
            <View className="gap-y-5 min-w-full">
              <View className="flex justify-center items-center py-4">
                <Text className="text-4xl text-center text-[#f9a826b3] font-bold">
                  Choose a monument
                </Text>
              </View>

              {monumentsData.map((card) => (
                <View
                  key={card[0].id}
                  className="flex flex-row justify-around items-center "
                >
                  {card.map((monument) => (
                    <Pressable
                      key={monument.id}
                      onPress={() => openModal(monument)}
                      className="flex-1"
                    >
                      <View className="flex flex-col items-center">
                        <Image
                          className="rounded-lg border-4 border-zinc-100 shadow-[5px_2px_28px_21px_#c9c9c9]"
                          source={monument.image}
                          style={{ width: width / 2.2, height: height / 5 }}
                        />
                      </View>
                    </Pressable>
                  ))}
                </View>
              ))}
            </View>

            {/* Modal for Monument Info */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}
            >
              <Pressable
                onPress={closeModal}
                className="flex-1 justify-center items-center bg-zinc-900/90"
              >
                <Pressable
                  onPress={() => {}}
                  className="w-3/4 bg-[#f9a826b3] p-5 rounded-3xl relative"
                >
                  {selectedMonument && (
                    <>
                      <Image
                        source={selectedMonument.image}
                        style={{ width: width / 2, height: height / 5 }}
                        className="absolute -top-[60%] left-[20%] rounded-lg shadow-[5px_2px_28px_21px_#c9c9c9]"
                      />
                      <View className="flex flex-col justify-center items-center min-w-full pt-20 gap-y-4">
                        <Text className="text-2xl text-zinc-200 font-bold text-center ">
                          {dificulty}
                        </Text>
                        <View className="min-w-full">
                          <StartButton
                            onPress={() => {
                              closeModal();
                              navigation.navigate("GameScreen", {
                                monument: selectedMonument,
                                name: selectedMonument.name,
                                latitude: selectedMonument.latitude,
                                longitude: selectedMonument.longitude,
                              });
                            }}
                          />
                        </View>
                      </View>
                    </>
                  )}
                </Pressable>
              </Pressable>
            </Modal>

            <View className="px-4">
              <BackButton
                onPress={() => navigation.goBack()}
                icon="arrow-back-outline"
              />
            </View>
          </SafeAreaView>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
