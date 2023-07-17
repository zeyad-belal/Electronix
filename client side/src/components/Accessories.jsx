import { Link } from "react-router-dom";

const Accessories = () => {
  return (
    <>
<div className="flex flex-wrap w-3/4 justify-between">
    {/* /////////////////////// Headers //////////////////////////// */}
  <div className="p-4 m-auto w-full md:w-1/3">
    <Link className="flex justify-between items-center" to={"./products?brand=Apple&category=Accessories&orderBy=newArrival"}>
      <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">Apple</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/3">
    <Link className="flex justify-between items-center" to={"./products?brand=Samsung&category=Accessories&orderBy=newArrival"}>
      <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">Samsung</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/3">
    <Link className="flex justify-between items-center" to={"./products?brand=Sony&category=Accessories&orderBy=newArrival"}>
      <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">Sony </span>
    </Link>
  </div>
  <div className="p-4  w-full md:w-1/3">
    <Link className="flex  " to={"./products?brand=Xiaomi&category=Accessories&orderBy=newArrival"}>
      <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">Xiaomi</span>
    </Link>
  </div>


  {/* //////////////////////// menu  1 ///////////////////////// */}
  {/* <div className="p-4 m-auto w-full  md:w-1/4">
    <Link className="flex justify-between   " to={"./Category"}>
      <span className="m-auto uppercase hover:text-orange-500 tracking-wider text-sm whitespace-nowrap">CABLE</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full  md:w-1/4">
    <Link className="flex justify-between  " to={"./Category"}>
      <span className="m-auto uppercase hover:text-orange-500 tracking-wider text-sm whitespace-nowrap">SCHOOL BAGS AND LAPTOPS</span>
    </Link> 
  </div>
  <div className="p-4 m-auto w-full  md:w-1/4">
    <Link className="flex justify-between  " to={"./Category"}>
      <span className="m-auto uppercase hover:text-orange-500 tracking-wider text-sm whitespace-nowrap">SMART WATCHES </span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full  md:w-1/4">
    <Link className="flex justify-between  " to={"./Category"}>
      <span className="m-auto uppercase hover:text-orange-500 tracking-wider text-sm whitespace-nowrap">HEADPHONES</span>
    </Link>
  </div> */}

 {/* //////////////////////// menu  2 ///////////////////////// */}
 {/* <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">CHARGERS</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">LAPTOP CHARGERS AND BATTERIES</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">SMART BAND</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">TWS WIRELESS HEADPHONES</span>
    </Link>
  </div>
 */}


 {/* //////////////////////// menu  3 ///////////////////////// */}
 {/* <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">POWER BANK</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">CABLES AND CONNECTIONS
</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">SMART WATCH ACCESSORIES</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">TWS EARPHONE CASES</span>
    </Link>
  </div>

 */}

 {/* //////////////////////// menu  4 ///////////////////////// */}
  {/* <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">SOCKS</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">MOUSE AND KEYBOARD</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">SMART WATCH CHARGERS</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">SPEAKERS</span>
    </Link>
  </div>
 */}


 {/* //////////////////////// menu 5 ///////////////////////// */}
 {/* <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">SCREEN PROTECTOR</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">WEB CAMERAS</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap"> </span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">SUBWOOFER AND HOME THEATER</span>
    </Link>
  </div>


 */}

 {/* //////////////////////// menu  6 ///////////////////////// */}
 {/* <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap"> </span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">POWER SUPPLY</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">  </span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">MICROPHONE</span>
    </Link>
  </div>


 */}

 {/* //////////////////////// menu  7 ///////////////////////// */}
 {/* <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap"> </span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">OTHER PRODUCTS</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap"> </span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500  tracking-wider text-sm whitespace-nowrap"> </span>
    </Link>
  </div>
 */}

    {/* /////////////////////// Headers 2//////////////////////////// */}
    {/* <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase hover:text-orange-500  font-bold tracking-wider text-sm whitespace-nowrap">TV ACCESSORIES</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase hover:text-orange-500  font-bold tracking-wider text-sm whitespace-nowrap">CAR ACCESSORIES</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500 font-bold tracking-wider text-sm whitespace-nowrap">DIGITAL CAMERAS</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/4">
    <Link className="flex justify-between items-center" to={"./Category"}>
      <span className="m-auto uppercase  hover:text-orange-500 font-bold tracking-wider text-sm whitespace-nowrap">BATTERIES</span>
    </Link>
  </div>

 */}


  </div>
    </>
  );
};

export default Accessories;