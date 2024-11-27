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
                className="tab relative flex h-[80px] w-[246px] items-center justify-start gap-[8px] rounded-[16px] border-[1px] border-second-500"
              >
                <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-fourth-200 text-center font-nunito text-[24px] font-bold leading-[30px] tracking-[-2%] text-second-500">
                  2
                </span>
                <div>
                  <h2 className="text-left font-nunito text-[12px] font-medium leading-[18px]">
                    Step 1/3
                  </h2>
                  <h1 className="font-nunito text-[16px] font-extrabold leading-[24px] text-second-500">
                    Basic Information
                  </h1>
                </div>
              </a>

              <a
                role="tab"
                className="tab relative flex h-[80px] w-[80px] items-center justify-center gap-[8px] rounded-[16px] border-[1px]"
              >
                <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-fourth-200 text-second-500">
                  3
                </span>
              </a>
            </div>
          </div>
          <div className="mt-[-200px] flex min-h-screen items-center justify-center">
            <form className="w-full max-w-4xl space-y-4 rounded-lg p-6">
              <h1 className="mb-4 font-nunito text-2xl text-[24px] font-bold leading-[30px] tracking-[-2%] text-second-500">
                Basic Information
              </h1>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="form-control">
                  <span className="label-text">Name</span>
                  <input
                    type="text"
                    placeholder="Jon Snow"
                    className="input input-bordered h-[48px] rounded-[8px] border-[1px]"
                  />
                </label>

                <label className="form-control">
                  <span className="label-text">Date of Birth</span>
                  <input
                    type="date"
                    className="input input-bordered h-[48px] rounded-[8px] border-[1px]"
                  />
                </label>

                <label className="form-control">
                  <span className="label-text">Location</span>
                  <div className="relative">
                    <select className="input input-bordered h-[48px] w-full appearance-none rounded-[8px] border-[1px] pr-10">
                      <option value="" disabled selected>
                        Thailand
                      </option>
                      <option value="bangkok">Bangkok</option>
                      <option value="chiangmai">Chiang Mai</option>
                      <option value="phuket">Phuket</option>
                      <option value="korat">Nakhon Ratchasima</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      ▼
                    </span>
                  </div>
                </label>

                <label className="form-control">
                  <span className="label-text">City</span>
                  <div className="relative">
                    <select className="input input-bordered h-[48px] w-full appearance-none rounded-[8px] border-[1px] pr-10">
                      <option value="" disabled selected>
                        Bangkok
                      </option>
                      <option value="bangkok">Bangkok</option>
                      <option value="chiangmai">Chiang Mai</option>
                      <option value="phuket">Phuket</option>
                      <option value="korat">Nakhon Ratchasima</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      ▼
                    </span>
                  </div>
                </label>

                <label className="form-control">
                  <span className="label-text">Username</span>
                  <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered h-[48px] rounded-[8px] border-[1px]"
                  />
                </label>

                <label className="form-control">
                  <span className="label-text">Email</span>
                  <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered h-[48px] rounded-[8px] border-[1px]"
                  />
                </label>

                <label className="form-control">
                  <span className="label-text">Password</span>
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered h-[48px] rounded-[8px] border-[1px]"
                  />
                </label>

                <label className="form-control">
                  <span className="label-text">Confirm Password</span>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="input input-bordered h-[48px] rounded-[8px] border-[1px]"
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer className="absolute left-1/2 top-[850px] flex h-[112px] w-full -translate-x-1/2 items-center justify-between border-t border-gray-300 bg-white">
        <div>
          <span className="ml-80">1/3</span>
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
