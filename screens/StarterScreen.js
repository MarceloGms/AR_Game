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
	Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import TorreDeBelem from "../assets/TorreDeBelem.jpg";
import MosteiroDaBatalha from "../assets/MosteiroDaBatalha.jpg";
import TorreEiffel from "../assets/TorreEiffel.jpg";
import Colosseum from "../assets/Colosseum.jpeg";
import ArcoDoTriunfo from "../assets/ArcoDoTriunfo.jpg";
import PadraoDosDescobrimentos from "../assets/PadraoDosDescobrimentos.jpg";

import BackButton from "../components/BackButton";

const { width, height } = Dimensions.get("window");

export default function StarterScreen() {
	const navigation = useNavigation();
	const [selectedMonument, setSelectedMonument] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const cards = [
		[
			{
				id: 1,
				name: "Se nova ",
				image: TorreDeBelem,
				description: "The Tower of Belém is a fortified tower...",
				latitude: 38.6916,
				longitude: -9.216,
			},
			{
				id: 2,
				name: "Mosteiro da Batalha",
				image: MosteiroDaBatalha,
				description: "The Monastery of Batalha is a Dominican convent...",
			},
		],
		[
			{
				id: 3,
				name: "Eiffel Tower",
				image: TorreEiffel,
				description: "The Eiffel Tower is a wrought-iron lattice tower...",
			},
			{
				id: 4,
				name: "Colosseum",
				image: Colosseum,
				description: "The Colosseum is an elliptical amphitheatre...",
			},
		],
		[
			{
				id: 5,
				name: "Arco do Triunfo",
				image: ArcoDoTriunfo,
				description: "The Arc de Triomphe de l'Étoile is one of the most...",
			},
			{
				id: 6,
				name: "Padrão dos Descobrimentos",
				image: PadraoDosDescobrimentos,
				description: "The Monument to the Discoveries is a monument...",
			},
		],
	];

	const openModal = (monument) => {
		setSelectedMonument(monument);
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
		setSelectedMonument(null);
	};

	return (
		<ScrollView className="flex-1 bg-[#5c2f00] min-w-full">
			<View>
				<SafeAreaView className="flex-1 justify-between min-h-screen items-start">
					<View className="gap-y-5 min-w-full">
						<View className="flex justify-center items-center">
							<Text className="text-3xl text-center text-zinc-100 font-bold">
								Starter Screen
							</Text>
						</View>

						{cards.map((card) => (
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
						<View className="flex-1 justify-center items-center bg-black bg-opacity-50">
							<View className="w-3/4 bg-white p-5 rounded-lg">
								{selectedMonument && (
									<>
										<Text className="text-xl font-bold text-center mb-4">
											{selectedMonument.name}
										</Text>
										<Button
											title="Start"
											onPress={() => {
												navigation.navigate("GameScreen", {
													name: selectedMonument.name,
													latitude: selectedMonument.latitude,
													longitude: selectedMonument.longitude,
												});
												closeModal();
											}}
										/>
										<Button title="Close" onPress={closeModal} color="red" />
									</>
								)}
							</View>
						</View>
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
	);
}
