import Unknown from "../assets/categories/unknown.svg";
import Alcohols from "../assets/categories/alcohols.svg";
import Medical from "../assets/categories/medical.svg";
import ReadyMeals from "../assets/categories/readyMeals.svg";
import PetSupplies from "../assets/categories/petSupplies.svg";
import HouseAndGarden from "../assets/categories/houseAndGarden.svg";
import BabyProducts from "../assets/categories/babyProducts.svg";
import Electronics from "../assets/categories/electronics.svg";
import Hygiene from "../assets/categories/hygiene.svg";
import TeaAndCoffee from "../assets/categories/teaAndCoffee.svg";
import CannedAndPreserved from "../assets/categories/cannedAndPreserved.svg";
import MeatAndColdCuts from "../assets/categories/meatAndColdCuts.svg";
import Frozen from "../assets/categories/frozen.svg";
import Dairy from "../assets/categories/dairy.svg";
import FruitsAndVegetables from "../assets/categories/fruitsAndVegetables.svg";
import Stationery from "../assets/categories/stationery.svg";
import Bakery from "../assets/categories/bakery.svg";
import SpicesSaucesOils from "../assets/categories/spicesSaucesOils.svg";
import FishAndSeafood from "../assets/categories/fishAndSeafood.svg";
import DryGoodsAndPasta from "../assets/categories/dryGoodsAndPasta.svg";
import Sweets from "../assets/categories/sweets.svg";
import Clothing from "../assets/categories/clothing.svg";
import Vege from "../assets/categories/vege.svg";
import WaterAndDrinks from "../assets/categories/waterAndDrinks.svg";
import CleaningSupplies from "../assets/categories/cleaningSupplies.svg";
import Other from "../assets/categories/other.svg";

const useCategory = (category: string) => {
  switch (category) {
    case "alcohols":
      return <Alcohols />;
    case "medical":
      return <Medical />;
    case "readyMeals":
      return <ReadyMeals />;
    case "petSupplies":
      return <PetSupplies />;
    case "houseAndGarden":
      return <HouseAndGarden />;
    case "babyProducts":
      return <BabyProducts />;
    case "electronics":
      return <Electronics />;
    case "hygiene":
      return <Hygiene />;
    case "teaAndCoffee":
      return <TeaAndCoffee />;
    case "cannedAndPreserved":
      return <CannedAndPreserved />;
    case "meatAndColdCuts":
      return <MeatAndColdCuts />;
    case "frozen":
      return <Frozen />;
    case "dairy":
      return <Dairy />;
    case "fruitsAndVegetables":
      return <FruitsAndVegetables />;
    case "stationery":
      return <Stationery />;
    case "bakery":
      return <Bakery />;
    case "spicesSaucesOils":
      return <SpicesSaucesOils />;
    case "fishAndSeafood":
      return <FishAndSeafood />;
    case "dryGoodsAndPasta":
      return <DryGoodsAndPasta />;
    case "sweets":
      return <Sweets />;
    case "clothing":
      return <Clothing />;
    case "vege":
      return <Vege />;
    case "waterAndDrinks":
      return <WaterAndDrinks />;
    case "cleaningSupplies":
      return <CleaningSupplies />;
    case "other":
      return <Other />;
    default:
      return <Unknown />;
  }
};

export default useCategory;
