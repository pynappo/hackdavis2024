import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div>
        <Image
          src="https://placehold.co/600x400/png"
          alt="placeholder"
          width={600}
          height={400}
        />
        <h1>Davis Community Meals and Housing</h1>
        <h2>Instilling Hope and Saving Lives</h2>
      </div>
    </div>
  );
}
