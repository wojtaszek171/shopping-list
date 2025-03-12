import { CategoriesEnum } from "../../../utils/consts";
import Alcohols from "../../../assets/categories/alcohols.svg";
import Medical from "../../../assets/categories/medical.svg";
import ReadyMeals from "../../../assets/categories/readyMeals.svg";
import PetSupplies from "../../../assets/categories/petSupplies.svg";
import HouseAndGarden from "../../../assets/categories/houseAndGarden.svg";
import BabyProducts from "../../../assets/categories/babyProducts.svg";
import Electronics from "../../../assets/categories/electronics.svg";
import Hygiene from "../../../assets/categories/hygiene.svg";
import TeaAndCoffee from "../../../assets/categories/teaAndCoffee.svg";
import CannedAndPreserved from "../../../assets/categories/cannedAndPreserved.svg";
import MeatAndColdCuts from "../../../assets/categories/meatAndColdCuts.svg";
import Frozen from "../../../assets/categories/frozen.svg";
import Dairy from "../../../assets/categories/dairy.svg";
import FruitsAndVegetables from "../../../assets/categories/fruitsAndVegetables.svg";
import Stationery from "../../../assets/categories/stationery.svg";
import Bakery from "../../../assets/categories/bakery.svg";
import SpicesSaucesOils from "../../../assets/categories/spicesSaucesOils.svg";
import FishAndSeafood from "../../../assets/categories/fishAndSeafood.svg";
import DryGoodsAndPasta from "../../../assets/categories/dryGoodsAndPasta.svg";
import Sweets from "../../../assets/categories/sweets.svg";
import Clothing from "../../../assets/categories/clothing.svg";
import Vege from "../../../assets/categories/vege.svg";
import WaterAndDrinks from "../../../assets/categories/waterAndDrinks.svg";
import CleaningSupplies from "../../../assets/categories/cleaningSupplies.svg";
import Other from "../../../assets/categories/other.svg";

const categpryIconMapping = {
  [CategoriesEnum.alcohols]: <Alcohols />,
  [CategoriesEnum.medical]: <Medical />,
  [CategoriesEnum.readyMeals]: <ReadyMeals />,
  [CategoriesEnum.petSupplies]: <PetSupplies />,
  [CategoriesEnum.houseAndGarden]: <HouseAndGarden />,
  [CategoriesEnum.babyProducts]: <BabyProducts />,
  [CategoriesEnum.electronics]: <Electronics />,
  [CategoriesEnum.hygiene]: <Hygiene />,
  [CategoriesEnum.teaAndCoffee]: <TeaAndCoffee />,
  [CategoriesEnum.cannedAndPreserved]: <CannedAndPreserved />,
  [CategoriesEnum.meatAndColdCuts]: <MeatAndColdCuts />,
  [CategoriesEnum.frozen]: <Frozen />,
  [CategoriesEnum.dairy]: <Dairy />,
  [CategoriesEnum.fruitsAndVegetables]: <FruitsAndVegetables />,
  [CategoriesEnum.stationery]: <Stationery />,
  [CategoriesEnum.bakery]: <Bakery />,
  [CategoriesEnum.spicesSaucesOils]: <SpicesSaucesOils />,
  [CategoriesEnum.fishAndSeafood]: <FishAndSeafood />,
  [CategoriesEnum.dryGoodsAndPasta]: <DryGoodsAndPasta />,
  [CategoriesEnum.sweets]: <Sweets />,
  [CategoriesEnum.clothing]: <Clothing />,
  [CategoriesEnum.vege]: <Vege />,
  [CategoriesEnum.waterAndDrinks]: <WaterAndDrinks />,
  [CategoriesEnum.cleaningSupplies]: <CleaningSupplies />,
  [CategoriesEnum.other]: <Other />,
};

const useCategories = () => {
  const getCategory = (key: CategoriesEnum) => ({
    key: key,
    icon: categpryIconMapping[key],
  });

  const getAllCategories = () =>
    Object.keys(categpryIconMapping).map((key) =>
      getCategory(key as CategoriesEnum),
    );

  return {
    getCategory,
    getAllCategories,
  };
};

export default useCategories;
