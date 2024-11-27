import { CustomButton } from "@/components/CustomUi";
import { IoMdArrowBack } from "react-icons/io";

export default function Register() {
  return (
    <>
      <div className="flex items-center justify-center bg-utility-bgMain">
        <div className="mt-14">
          <svg
            width="100%"
            height="579"
            viewBox="0 0 1440 579"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 top-0"
          >
            <circle cx="31" cy="50" r="50" fill="#FAF1ED" />
            <circle cx="1424.5" cy="549.5" r="29.5" fill="#FAF1ED" />
            <circle cx="85" cy="129" r="4" fill="#7B4429" />
          </svg>
          <div className="flex h-[145px] w-full items-center justify-center px-8">
            <div className="head mr-8 h-[145px] w-[453px] gap-[216px] text-left">
              <h2 className="font-nunito text-[14px] font-semibold leading-[21px]">
                Register
              </h2>
              <h1 className="font-nunito text-[46px] font-extrabold leading-[57.5px] tracking-[-0.02em] text-second-500">
                Join us and start matching
              </h1>
            </div>

            <div className="flex h-[80px] w-[430px] space-x-[12px]">
              <a
                role="tab"
                className="tab relative flex h-[80px] w-[80px] items-center justify-center gap-[8px] rounded-[16px] border-[1px]"
              >
                <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-fourth-200 text-second-500">
                  1
                </span>
              </a>

              <a
                role="tab"
                className="tab relative flex h-[80px] w-[80px] items-center justify-center gap-[8px] rounded-[16px] border-[1px]"
              >
                <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-fourth-200 text-second-500">
                  2
                </span>
              </a>

              <a
                role="tab"
                className="tab relative flex h-[80px] w-[246px] items-center justify-start gap-[8px] rounded-[16px] border-[1px] border-second-500"
              >
                <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-fourth-200 text-center font-nunito text-[24px] font-bold leading-[30px] tracking-[-2%] text-second-500">
                  3
                </span>
                <div>
                  <h2 className="text-left font-nunito text-[12px] font-medium leading-[18px]">
                    Step 3/3
                  </h2>
                  <h1 className="font-nunito text-[16px] font-extrabold leading-[24px] text-second-500">
                    Upload Photos
                  </h1>
                </div>
              </a>
            </div>
          </div>
          <div className="mt-[-200px] flex min-h-screen items-center justify-center">
            <form className="w-full max-w-4xl space-y-4 rounded-lg p-6">
              <h1 className="mb-4 font-nunito text-2xl text-[24px] font-bold leading-[30px] tracking-[-2%] text-second-500">
                Profile pictures
              </h1>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="form-control">
                  <span className="label-text">Upload at least 2 photos</span>
                </label>
              </div>
              <div className="flex h-[167px] w-[931px] space-x-4 rounded-lg border-gray-300">
                <div className="relative">
                  <div className="h-[167px] w-[167px] rounded-lg border-2 border-gray-300">
                    <button className="absolute right-[-5px] top-[-10px] flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xl text-white hover:bg-red-700">
                      x
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="h-[167px] w-[167px] rounded-lg border-2 border-gray-300">
                    <button className="absolute right-[-5px] top-[-10px] flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xl text-white hover:bg-red-700">
                      x
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="h-[167px] w-[167px] rounded-lg border-2 border-gray-300">
                    <button className="absolute right-[-5px] top-[-10px] flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xl text-white hover:bg-red-700">
                      x
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="h-[167px] w-[167px] rounded-lg border-2 border-gray-300">
                    <button className="absolute right-[-5px] top-[-10px] flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xl text-white hover:bg-red-700">
                      x
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="h-[167px] w-[167px] rounded-lg border-2 border-gray-300">
                    <button className="absolute right-[-5px] top-[-10px] flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xl text-white hover:bg-red-700">
                      x
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer className="absolute left-1/2 top-[850px] flex h-[112px] w-full -translate-x-1/2 items-center justify-between border-t border-gray-300 bg-white">
        <div>
          <span className="ml-80">3/3</span>
        </div>
        <div className="mr-60 flex space-x-4">
          <button className="flex h-[48px] w-[120px] items-center justify-center rounded-full border-2 text-primary-500">
            <IoMdArrowBack className="mr-2" />
            Back
          </button>
          <CustomButton
            buttonType="primary"
            customStyle="w-[120px] h-[48px] font-bold"
            onClick={() => router.push("/nextStep")}
          >
            Next step
          </CustomButton>
        </div>
      </footer>
    </>
  );
}
