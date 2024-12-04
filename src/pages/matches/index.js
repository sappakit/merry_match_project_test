import { FiSearch } from "react-icons/fi";
import { GoHeartFill } from "react-icons/go";

import { NavBar } from "@/components/NavBar";
import { CustomButton } from "@/components/CustomUi";

import { useState } from "react";
import { Range } from "react-range";
import dynamic from "next/dynamic";

const LazyCardSwiper = dynamic(() => import("@/components/CardSwiper"), {
  ssr: false,
});

function AgeRangeSlider() {
  const [values, setValues] = useState([18, 50]);

  return (
    <>
      {/* Slider */}
      <div className="w-full rounded-md bg-gray-300 px-2">
        <Range
          step={1}
          min={18}
          max={80}
          values={values}
          onChange={(values) => setValues(values)}
          renderTrack={({ props, children }) => {
            const { key, ...restProps } = props;
            return (
              <div key={key} {...restProps} className="relative h-[3px]">
                <div
                  className="absolute h-full bg-second-500"
                  style={{
                    width: `${((values[1] - values[0]) / (80 - 18)) * 100}%`,
                    marginLeft: `${((values[0] - 18) / (80 - 18)) * 100}%`,
                  }}
                />
                {children}
              </div>
            );
          }}
          renderThumb={({ props }) => {
            const { key, ...restProps } = props;
            return (
              <div
                key={key}
                {...restProps}
                className="h-4 w-4 rounded-full border-[3px] border-second-500 bg-second-300 outline-none"
              />
            );
          }}
        />
      </div>

      {/* Inputs */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={values[0]}
          onChange={(e) => setValues([+e.target.value, values[1]])}
          className="hover: w-full rounded-lg border-2 border-fourth-400 bg-utility-primary px-3 py-2 text-fourth-600 outline-none"
          min={18}
          max={values[1]}
        />
        <span className="font-semibold text-utility-second">-</span>
        <input
          type="number"
          value={values[1]}
          onChange={(e) => setValues([values[0], +e.target.value])}
          className="w-full rounded-lg border-2 border-fourth-400 bg-utility-primary px-3 py-2 text-fourth-600 outline-none"
          min={values[0]}
          max={80}
        />
      </div>
    </>
  );
}

function SidebarChat({ sender, message, img }) {
  return (
    <button className="flex items-center gap-4 px-3">
      <div className="flex size-14 overflow-hidden rounded-full">
        <img src={img} alt="" className="h-full w-full object-cover" />
      </div>

      <div className="text-start">
        <p className="text-sm text-fourth-900">{sender}</p>
        <p className="text-xs text-fourth-700">{message}</p>
      </div>
    </button>
  );
}

function CustomCheckbox({ list }) {
  return (
    <div className="form-control font-semibold text-fourth-700">
      <label className="label cursor-pointer justify-start gap-3 p-0">
        <input
          type="checkbox"
          className="checkbox border-fourth-400 transition-colors duration-300 [--chkbg:theme(colors.second.500)] [--chkfg:theme(colors.utility.primary)] checked:border-second-300 checked:text-fourth-100 hover:border-second-300"
        />
        <span className="label-text">{list}</span>
      </label>
    </div>
  );
}

function LeftSidebar() {
  return (
    <aside className="w-[17.5rem] border-r-2 border-fourth-300 bg-utility-primary">
      <div className="px-4 py-7">
        <button className="flex w-full flex-col items-center gap-4 rounded-xl border border-second-500 bg-fourth-100 px-3 py-6">
          <figure className="relative">
            <GoHeartFill className="size-10 text-primary-400" />
            <FiSearch className="absolute -bottom-1 -right-3 size-9 text-primary-600" />
          </figure>

          <div>
            <p className="text-xl font-bold text-primary-600">
              Discover New Match
            </p>
            <p className="text-center text-xs text-fourth-700">
              Start find and Merry to get know <br /> and connect with new
              friend!
            </p>
          </div>
        </button>
      </div>

      <div className="h-[2px] w-full bg-fourth-300"></div>

      <div className="flex flex-col gap-10 px-4 py-7">
        {/* Merry Match! carousel*/}
        <div className="flex flex-col gap-3">
          <p className="text-xl font-bold text-fourth-900">Merry Match!</p>
          {/* Carousel */}
          <div className="flex gap-3">
            <div className="flex size-[5rem] overflow-hidden rounded-2xl">
              <img
                src="/images/matching-page/matches_01.png"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex size-[5rem] overflow-hidden rounded-2xl">
              <img
                src="/images/matching-page/matches_02.png"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Chat with Merry Match */}
        <div className="flex flex-col gap-7">
          <p className="text-xl font-bold text-fourth-900">
            Chat with Merry Match
          </p>

          {/* Chat */}
          <div className="flex flex-col gap-7">
            {/* 1 */}
            <SidebarChat
              sender="Daeny"
              message="You: hi"
              img="/images/matching-page/matches_01.png"
            />

            {/* 2 */}
            <SidebarChat
              sender="Ygritte"
              message="You know nothing Jon Snow"
              img="/images/matching-page/matches_02.png"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

function RightSidebar() {
  const interestList = ["Default", "Male", "Female", "Non-bunary people"];

  return (
    <aside className="flex w-[15rem] flex-col border-l-2 border-fourth-300 bg-utility-primary py-7">
      <div className="flex h-[70%] flex-col gap-12 px-4">
        <div className="flex flex-col gap-5">
          <p className="font-bold text-fourth-900">Gender you interest</p>
          <div className="flex flex-col gap-4">
            {interestList.map((interest, index) => (
              <CustomCheckbox key={index} list={interest} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <p className="font-bold text-fourth-900">Age Range</p>
          <div className="flex flex-col gap-6">
            <AgeRangeSlider />
          </div>
        </div>
      </div>

      <div className="h-[2px] w-full bg-fourth-300"></div>

      <div className="flex items-center justify-end gap-6 px-4 py-4">
        <a
          href=""
          className="font-bold text-primary-500 transition-colors duration-300 hover:text-primary-600"
        >
          Clear
        </a>
        <CustomButton>Search</CustomButton>
      </div>
    </aside>
  );
}

export default function Matches() {
  return (
    <main className="items flex min-h-screen flex-col bg-utility-bg">
      <NavBar />
      <div className="flex flex-grow">
        <LeftSidebar />

        <section className="relative flex w-[20rem] flex-grow flex-col justify-center">
          <LazyCardSwiper />

          <p className="absolute bottom-5 z-30 w-full text-center text-fourth-700">
            Merry limit today <span className="text-primary-400">2/20</span>
          </p>
        </section>

        <RightSidebar />
      </div>
    </main>
  );
}
