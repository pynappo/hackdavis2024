import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grid grid-cols-2 grid-rows-2 my-2 place-items-center gap-2">
      <Link
        href="https://daviscommunitymeals.org/meals-program/"
        className="w-96 min-h-20 text-center border-solid rounded-lg border-2 border-black p-2"
      >
        <h2 className="text-xl">Meal Program</h2>
        <p>Providing meals to seniors, low-income, and homeless</p>
      </Link>
      <Link
        href="https://yolofoodbank.org"
        className="w-96 min-h-20 text-center border-solid rounded-lg border-2 border-black p-2"
      >
        <h2 className="text-xl">Yolo Food Bank</h2>
        <p>
          Yolo Food Bank works as a community to meet the food and nutrition
          needs of Yolo County.
        </p>
      </Link>
      <Link
        href="https://daviscommunitymeals.org/programs/"
        className="w-96 min-h-20 text-center border-solid rounded-lg border-2 border-black p-2"
      >
        <h2 className="text-xl">Shelter Services</h2>
        <p>Emergency Shelter, Supportive Housing, and Resource Center</p>
      </Link>
      <Link
        href="https://daviscommunitymeals.org/volunteer/"
        className="w-96 min-h-20 text-center border-solid rounded-lg border-2 border-black p-2"
      >
        <h2 className="text-xl">Meal Program</h2>
        <p>Support a much needed community resource!</p>
      </Link>
    </main>
  );
}
