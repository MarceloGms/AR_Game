import {
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import TorreDeBelem from "../assets/TorreDeBelem.jpg";
import MosteiroDaBatalha from "../assets/MosteiroDaBatalha.jpg";
import TorreEiffel from "../assets/TorreEiffel.jpg";
import Colosseum from "../assets/Colosseum.jpeg";
import ArcoDoTriunfo from "../assets/ArcoDoTriunfo.jpg";
import PadraoDosDescobrimentos from "../assets/PadraoDosDescobrimentos.jpg";

import BackButton from "../components/BackButton";
import MonumentInfoScreen from "./MonumentInfoScreen";

const { width, height } = Dimensions.get("window");

export default function StarterScreen() {
  const navigation = useNavigation();

  const cards = [
    [
      {
        id: 1,
        name: "Torre de Belem",
        image: TorreDeBelem,
        description:
          "The Tower of Belém is a fortified tower located in the civil parish of Santa Maria de Belém in the municipality of Lisbon, Portugal. It is a UNESCO World Heritage Site (along with the nearby Jerónimos Monastery) because of the significant role it played in the Portuguese maritime discoveries of the era of the Age of Discoveries. The tower was commissioned by King John II to be part of a defense system at the mouth of the Tagus river and a ceremonial gateway to Lisbon. The tower was built in the early 16th century and is a prominent example of the Portuguese Manueline style, but it also incorporates hints of other architectural styles. The structure was built from lioz limestone and is composed of a bastion and a 30-metre (98.4 ft), four-storey tower. It has incorrectly been stated that the tower was built in the middle of the Tagus and now sits near the shore because the river was redirected after the 1755 Lisbon earthquake.",
      },
      {
        id: 2,
        name: "Mosteiro da Batalha",
        image: MosteiroDaBatalha,
        description:
          "The Monastery of Batalha is a Dominican convent in the civil parish of Batalha, in the district of Leiria, in the Centro Region of Portugal. Originally, and officially known, as the Monastery of Saint Mary of the Victory (Portuguese: Mosteiro de Santa Maria da Vitória), it was erected in commemoration of the 1385 Battle of Aljubarrota, and would serve as the burial church of the 15th-Century Aviz dynasty of Portuguese royals. It is one of the best and original examples of Late Gothic architecture in Portugal, intermingled with the Manueline style. The convent was built to thank the Virgin Mary for the Portuguese victory over the Castilians in the battle of Aljubarrota in 1385, fulfilling a promise of King John I of Portugal. The battle put an end to the 1383–85 Crisis. It took over a century to build, starting in 1386 and ending circa 1517, spanning the reign of seven kings. It took the efforts of fifteen architects (Mestre das Obras da Batalha), but for seven of them the title was no more than an honorary title bestowed on them.",
      },
    ],
    [
      {
        id: 3,
        name: "Eiffel Tower",
        image: TorreEiffel,
        description:
          "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower. Constructed from 1887 to 1889 as the entrance to the 1889 World's Fair, it was initially criticized by some of France's leading artists and intellectuals for its design, but it has become a global cultural icon of France and one of the most recognisable structures in the world. The Eiffel Tower is the most-visited paid monument in the world; 6.91 million people ascended it in 2015. The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. The structure was not meant to be permanent, but it was still standing after the expiry of the permit for its demolition. The Eiffel Tower has three levels for visitors, with restaurants on the first and second levels. The top level's upper platform is 276 m (906 ft) above the ground, the highest observation deck accessible to the public in the European Union. Tickets can be purchased to ascend by stairs or lift (elevator) to the first and second levels. The climb from ground level to the first level is over 300 steps, as is the walk from the first to the second level. Although there is a staircase to the top level, it is usually accessible only by lift.",
      },
      {
        id: 4,
        name: "Colosseum",
        image: Colosseum,
        description:
          "The Colosseum is an elliptical amphitheatre in the centre of the city of Rome, Italy, the largest ever built in the Roman Empire. It is considered one of the greatest works of Roman architecture and Roman engineering and is the largest amphitheatre in the world. The Colosseum could hold, it is estimated, between 50,000 and 80,000 spectators, having an average audience of some 65,000; it was used for gladiatorial contests and public spectacles such as animal hunts, executions, re-enactments of famous battles, and dramas based on Classical mythology. The building ceased to be used for entertainment in the early medieval era. It was later reused for such purposes as housing, workshops, quarters for a religious order, a fortress, a quarry, and a Christian shrine.",
      },
    ],
    [
      {
        id: 5,
        name: "Arco do Triunfo",
        image: ArcoDoTriunfo,
        description:
          "The Arc de Triomphe de l'Étoile is one of the most famous monuments in Paris, France, standing at the western end of the Champs-Élysées at the centre of Place Charles de Gaulle, formerly named Place de l'Étoile—the étoile or 'star' of the juncture formed by its twelve radiating avenues. The location of the arc and the plaza is shared between three arrondissements, 16th (south and west), 17th (north), and 8th (east). The Arc de Triomphe honours those who fought and died for France in the French Revolutionary and Napoleonic Wars, with the names of all French victories and generals inscribed on its inner and outer surfaces. Beneath its vault lies the Tomb of the Unknown Soldier from World War I. As the central cohesive element of the Axe historique (historic axis, a sequence of monuments and grand thoroughfares on a route running from the courtyard of the Louvre to the Grande Arche de la Défense), the Arc de Triomphe was designed by Jean Chalgrin in 1806 and its iconographic program pitted heroically nude French youths against bearded Germanic warriors in chain mail. It set the tone for public monuments with triumphant patriotic messages.",
      },
      {
        id: 6,
        name: "Padrão dos Descobrimentos",
        image: PadraoDosDescobrimentos,
        description:
          "The Monument to the Discoveries is a monument on the northern bank of the Tagus River estuary, in the civil parish of Santa Maria de Belém, Lisbon. Located along the river where ships departed to explore and trade with India and the Orient, the monument celebrates the Portuguese Age of Discovery (or Age of Exploration) during the 15th and 16th centuries. The monument was conceived in 1939 by Portuguese architect José Ângelo Cottinelli Telmo, and sculptor Leopoldo de Almeida, as a temporary beacon during the Portuguese World Fair opening in June 1940. The Monument to the Discoveries represents a romantic idealisation of the Portuguese past that was typical during the regime of Salazar. The original monument was built with perishable materials, but it was rebuilt in concrete in 1960, in time for the commemoration of the 500th anniversary of the death of Henry the Navigator, the sponsor of the Portuguese Discoveries. In 1960, the original figures were replaced with new ones, representing other figures from the Portuguese Age of Discovery.",
      },
    ],
  ];

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
                    onPress={() => {
                      navigation.navigate("GameScreen", {
                        name: monument.name,
                        image: monument.image,
                        description: monument.description,
                      });
                    }}
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
