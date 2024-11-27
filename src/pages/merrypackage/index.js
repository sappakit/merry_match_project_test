import { NavBar,Footer } from "@/components/NavBar";
import { GoHeartFill } from "react-icons/go";
import { CustomButton } from "@/components/CustomUi";

export default function MerryPackage() {
    let costPackage = null; 
    let icon = "" ; 
    let namePackage = "" ; 
    
    if  ( namePackage = "Basic"  ) {
        costPackage === 59.00 
    } else if (namePackage = "platium" ) {
        costPackage === 99.00 
    } else if (namePakage = "Premium" ) {
        costPackage === 140.00
    }

    return (
  <>
<NavBar/> 
<section className="bg-utility-primary p-5 "> 
<article className=" flex flex-col gap-2 pb-5 bg-utility-primary   pt-5 p-4"> 
<div> 
<h3 className="text-third-700 font-medium"> MERRY MEMBERSHIP </h3>
</div>
<div> 
<h1 className="text-3xl text-second-500 font-bold"> Join us and start <br/> matching </h1>
</div>
</article>    

<article className="  bg-utility-primary border-2 mt-5 rounded-box p-4 gap-3 flex flex-col"> 
      {/* icon package  */}
      {/* เดี๋ยวไอคอนอาจจะต้องเปลี่ยนเป็นรูป */}
<div className="bg-slate-600 rounded-2xl w-16 h-16 flex flex-row items-center justify-center"> <GoHeartFill className="w-8 h-8"/> </div>
    {/* Title package  */}
<div> <h1 className="text-3xl font-bold"> Basic </h1> </div>
    {/* Cost package  */}
<div> <h1> THB 59.00  <span> /Month </span> </h1> </div>
{/* detail 1  */}
<div> <h1> ‘Merry’ more than a daily limited </h1> </div>
{/* detail 2  */}
<div> <h1> Up to 25 Merry per day </h1> </div>
<hr/> 

<CustomButton className="flex flex-shrink-0">  Choose Package  </CustomButton>

</article>

</section>

<Footer/>
</>
    );
  }