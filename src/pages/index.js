import Image from "next/image";
import localFont from "next/font/local";

export default function Home() {
  return (
    <div>
      <h1 className="font-nunito text-8xl text-primary-400">test</h1>
      <input type="text" placeholder="Test UI" className="input input-bordered w-full bg-red-100 text-red-600 placeholder-red-400 max-w-xs"/>

    </div>

    
  );
}
