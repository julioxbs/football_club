import Image from "next/image";
import appPreview from "../assets/app-nlw-copa-preview.png";
import logo from "../assets/logo.svg";
import avatars from "../assets/users-avatar-example.png";
import check from "../assets/icon-check.svg";
import Layout from "../components/Layout";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("");

  async function createPool(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      })

      const { code } = response.data;

      navigator.clipboard.writeText(code);

      alert("Pool created successfully, you can copy your code below");

      setPoolTitle("")
    } catch (error) {
      alert(`Ocurr error: ${error}`)
    }
  }

  return (
    <Layout>
      <main>
        <Image src={logo} alt="Logo nlw copa" />

        <h1 className="mt-14 mb-10 text-5xl text-white font-bold leading-tight">
          Create your own world cup pool and share with your friends
        </h1>

        <div className="flex items-center gap-2 mb-12">
          <Image
            src={avatars}
            alt="image of users already using this application"
          />

          <strong className="flex gap-2 text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.userCount}</span>
            people are already using
          </strong>
        </div>

        <form className="flex gap-2" onSubmit={createPool}>
          <input
            className="flex-1 px-6 py-4 bg-gray-800 border border-gray-600 p-4 rounded text-white placeholder:text-gray-300"
            type="text"
            placeholder="What is your pool's name?"
            onChange={(e) => setPoolTitle(e.target.value)}
            value={poolTitle}
          />

          <button
            className="bg-yellow-500 hover:bg-yellow-700 py-1 px-6 rounded text-sm uppercase text-black-800 font-bold"
            type="submit"
          >
            Create Pool
          </button>
        </form>

        <p className="mt-4 mb-10 text-gray-400 text-sm leading-relaxed">
          Once you have created your pool, you will receive a unique code that
          when you share it you can invite others. 👍
        </p>

        <div className="grid grid-cols-2 mb-4 border-t border-gray-600 pt-10 divide-x divide-gray-600">
          <div className="flex gap-2">
            <Image src={check} alt="A green check icon" />
            <div className="text-gray-100">
              <p className="text-2xl">+{props.poolCount}</p>
              <small>Pools created</small>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Image src={check} alt="A green check icon" />
            <div className="text-gray-100">
              <p className="text-2xl">+{props.guessCount}</p>
              <small>Guesses created</small>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreview}
        alt="Two phones showing the preview app"
        loading="eager"
      />
    </Layout>
  );
}

export async function getStaticProps() {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("pools/count"),
      api.get("guesses/count"),
      api.get("users/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  };
}
