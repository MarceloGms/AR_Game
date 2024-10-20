export default function MonumentCard({ name, image }) {
  return (
    <View key={card.id} className="flex flex-row justify-around gap-x-4">
      <Image
        className="rounded-lg border-4 border-zinc-100 shadow-[5px_2px_28px_21px_#c9c9c9]"
        source={monument1}
        alt="monument1"
        style={{
          width: width * 0.45,
          height: width * 0.45,
        }}
      />

      <Image
        className="rounded-lg border-4 border-zinc-100 shadow-[5px_2px_28px_21px_#c9c9c9]"
        source={monument1}
        alt="monument1"
        style={{
          width: width * 0.45,
          height: width * 0.45,
        }}
      />
    </View>
  );
}
