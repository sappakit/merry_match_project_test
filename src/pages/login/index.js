import { NavBar } from "@/components/NavBar";
import { CustomButton, CardImage } from "@/components/CustomUi";

function CustomInput({ type, label = "Label", placeholder, className = "" }) {
  const customStyle =
    `input border-fourth-400 bg-utility-primary text-utility-second transition-colors duration-100 focus:border-second-500 focus:outline-none ${className}`.trim();

  return (
    <label className="form-control w-full">
      <div className="label p-1">
        <span className="label-text text-utility-second">{label}</span>
      </div>
      <input type={type} placeholder={placeholder} className={customStyle} />
    </label>
  );
}

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col bg-utility-bgMain">
      <NavBar />

      {/* Login section */}
      <article className="container mx-auto flex w-full flex-grow flex-col items-center justify-center gap-10 px-5 py-12 lg:flex-row lg:gap-0 lg:p-10 xl:p-20">
        <figure className="flex items-center justify-center lg:w-1/2 lg:px-12">
          <CardImage className="h-[25rem] w-[15rem] lg:h-[40rem] lg:w-[25rem]">
            <img
              src="/images/login_page_man.jpg"
              alt="Man smiling while using laptop"
              className={`h-full w-full object-cover object-right grayscale`}
            />
          </CardImage>
        </figure>

        <div className="flex w-full flex-col gap-8 self-start lg:w-1/2 lg:self-auto lg:p-12">
          <header className="flex flex-col gap-1">
            <h2 className="text-third-700">LOGIN</h2>
            <h1 className="text-3xl font-extrabold leading-tight text-second-500 lg:text-5xl">
              Welcome <br className="hidden lg:inline xl:hidden" /> back to{" "}
              <br className="inline sm:hidden lg:inline" /> Merry Match
            </h1>
          </header>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("submitted");
            }}
            className="flex flex-col gap-8"
            role="main"
          >
            <CustomInput
              type="text"
              label="Username or Email"
              placeholder="Enter Username or Email"
              className="w-full"
            />

            <CustomInput
              type="password"
              label="Password"
              placeholder="Enter password"
              className="w-full"
            />

            <CustomButton type="submit" buttonType="primary" className="w-full">
              Log in
            </CustomButton>
          </form>

          <div className="flex items-center gap-3">
            <p className="text-utility-second">Don’t have an account?</p>
            <a
              href="/register"
              className="font-bold text-primary-500 transition-colors duration-300 hover:text-primary-600"
            >
              Register
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
