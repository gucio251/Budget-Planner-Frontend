import { ReactComponent as BillsIcon } from 'assets/icons/billsIcon.svg';
import { ReactComponent as FoodIcon } from 'assets/icons/foodIcon.svg';
import { ReactComponent as ShoppingIcon } from 'assets/icons/shoppingIcon.svg';
import { ReactComponent as EducationIcon } from 'assets/icons/educationIcon.svg';
import { ReactComponent as EntertainmentIcon } from 'assets/icons/entertainmentIcon.svg';
import { ReactComponent as FeesAndChargesIcon } from 'assets/icons/feesAndChargesIcon.svg';
import { ReactComponent as HealthIcon } from 'assets/icons/healthIcon.svg';
import { ReactComponent as InsuranceIcon } from 'assets/icons/insuranceIcon.svg';
import { ReactComponent as KidsIcon } from 'assets/icons/kidsIcon.svg';
import { ReactComponent as MediaIcon } from 'assets/icons/mediaIcon.svg';
import { ReactComponent as PetsIcon } from 'assets/icons/petsIcon.svg';
import { ReactComponent as RetirementIcon } from 'assets/icons/retirementIcon.svg';
import { ReactComponent as SportIcon } from 'assets/icons/sportIcon.svg';
import { ReactComponent as RentIcon } from 'assets/icons/rentIcon.svg';
import { ReactComponent as RestaurantsIcon } from 'assets/icons/restaurantsIcon.svg';
import { ReactComponent as TransportIcon } from 'assets/icons/transportIcon.svg';
import { ReactComponent as TravelIcon } from 'assets/icons/travelIcon.svg';
import { ReactComponent as AwardIcon } from 'assets/icons/awardIcon.svg';
import { ReactComponent as GiftIcon } from 'assets/icons/giftIcon.svg';
import { ReactComponent as SalaryIcon } from 'assets/icons/salaryIcon.svg';
import { ReactComponent as SellingAndTradeIcon } from 'assets/icons/sellingAndTradeIcon.svg';
import { ReactComponent as EuroIcon} from 'assets/icons/euroIcon.svg';
import { ReactComponent as PoundIcon} from 'assets/icons/poundIcon.svg';
import { ReactComponent as ZlotyIcon} from 'assets/icons/zlotyIcon.svg';
import { ReactComponent as DollarIcon} from 'assets/icons/dollarIcon.svg';
import { ReactComponent as EuroIconSmall } from 'assets/icons/euroIconSmall.svg';
import { ReactComponent as PoundIconSmall } from 'assets/icons/poundIconSmall.svg';
import { ReactComponent as ZlotyIconSmall } from 'assets/icons/zlotyIconSmall.svg';
import { ReactComponent as DollarIconSmall } from 'assets/icons/dollarIconSmall.svg';

export const expenseTypeSvgCorrelation = {
  Bills: BillsIcon,
  Education: EducationIcon,
  Entertainment: EntertainmentIcon,
  ['Fees & Charges']: FeesAndChargesIcon,
  Food: FoodIcon,
  Health: HealthIcon,
  Insurances: InsuranceIcon,
  Kids: KidsIcon,
  Media: MediaIcon,
  Pets: PetsIcon,
  Retirement: RetirementIcon,
  Shopping: ShoppingIcon,
  Sport: SportIcon,
  Rent: RentIcon,
  Restaurants: RestaurantsIcon,
  Transport: TransportIcon,
  Travel: TravelIcon,
};

export const graphColors = {
  Bills: { base: '#32C5FF', hovered: '#006d98' },
  Education: { base: '#6E6CF2', hovered: '#100ea0' },
  Entertainment: { base: '#DB46B5', hovered: '#781760' },
  ['Fees & Charges']: { base: '#3BE2E9', hovered: '#0e7e83' },
  Food: { base: '#00D793', hovered: '#000906' },
  Health: { base: '#FF2D55', hovered: '#96001c' },
  Insurances: { base: '#FFCC00', hovered: '#7f6600' },
  Kids: { base: '#DD00FF', hovered: '#6e007f' },
  Media: { base: '#8E8E93', hovered: '#464649' },
  Pets: { base: '#9C6345', hovered: '#4e3122' },
  Retirement: { base: '#B8B8BD', hovered: '#595960' },
  Shopping: { base: '#FF7E87', hovered: '#be000d' },
  Sport: { base: '#45B0E0', hovered: '#145d7d' },
  Rent: { base: '#FFCAA2', hovered: '#d05900' },
  Restaurants: { base: '#FF9500', hovered: '#7f4a00' },
  Transport: { base: '#8261F5', hovered: '#2b0aa0' },
  Travel: { base: '#4CD964', hovered: '#197829' },
  Award: { base: '#ffcc00', hovered: '#7f6600' },
  Gift: { base: '#ff32c0', hovered: '#980069' },
  Salary: { base: '#007aff', hovered: '#003d7f' },
};

export const incomeTypeSvgCorrelation = {
  Award: AwardIcon,
  Gift: GiftIcon,
  Salary: SalaryIcon,
  ['Selling & Trade']: SellingAndTradeIcon,
}

export const currenciesSvgCorrelation = {
  PLN: ZlotyIcon,
  EUR: EuroIcon,
  GBP: PoundIcon,
  USD: DollarIcon,
  PLNSmall: ZlotyIconSmall,
  EURSmall: EuroIconSmall,
  GBPSmall: PoundIconSmall,
  USDSmall: DollarIconSmall,
};


