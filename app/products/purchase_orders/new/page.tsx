import React from "react";
import Link from "next/link";
import { Supplier } from "@/types/supplier";
import CreatePurchaseOrderForm from "@/components/products/purchase_orders/CreatePurchaseOrderForm";
import { apiUrl } from "@/lib/utils";
import { IoIosArrowRoundBack } from "react-icons/io";

export const dynamic = "force-dynamic"

export default async function CreatePurchaseOrderPage() {
  const requests = [
    fetch(apiUrl("/api/settings/locations")),
    fetch(apiUrl("/api/suppliers")),
  ];

  const [locationsRes, suppliersRes] = await Promise.all(requests);

  if (!locationsRes.ok) {
    throw new Error("Failed to fetch locations");
  }
  if (!suppliersRes.ok) {
    throw new Error("Failed to fetch suppliers");
  }

  const locations = await locationsRes.json();
  const suppliers: Supplier[] = await suppliersRes.json();

  return (
    <div className=" w-full bg-gray-100 min-h-screen items-center flex flex-col">
      <div className="flex-col max-w-5xl w-full flex gap-6 md:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-3 px-4 md:px-0 items-start md:items-center ">
          <Link
            href="/products/purchase_orders"
            className="p-1 rounded-md hover:bg-black/10 transition-all"
          >
            <IoIosArrowRoundBack size={20} className="text-[#1a1a1a]" />
          </Link>
          <h1 className="text-xl font-bold text-[#1a1a1a]">
            Create Purchase Order
          </h1>
        </div>

        <CreatePurchaseOrderForm
          currencies={currencies}
          suppliers={suppliers}
          locations={locations}
        />
      </div>
    </div>
  );
}

const currencies = [
  { label: "Select", value: "", disabled: true },
  { label: "US dollars (USD)", value: "USD" },
  { label: "Euros (EUR)", value: "EUR" },
  { label: "British pounds (GBP)", value: "GBP" },
  { label: "Canadian dollars (CAD)", value: "CAD" },
  { label: "Afghan Afghanis (AFN)", value: "AFN" },
  { label: "Albanian lekë (ALL)", value: "ALL" },
  { label: "Algerian dinars (DZD)", value: "DZD" },
  { label: "Angolan kwanzas (AOA)", value: "AOA" },
  { label: "Argentine pesos (ARS)", value: "ARS" },
  { label: "Armenian drams (AMD)", value: "AMD" },
  { label: "Aruban florin (AWG)", value: "AWG" },
  { label: "Australian dollars (AUD)", value: "AUD" },
  { label: "Barbadian dollars (BBD)", value: "BBD" },
  { label: "Azerbaijani manats (AZN)", value: "AZN" },
  { label: "Bangladeshi takas (BDT)", value: "BDT" },
  { label: "Bahamian dollars (BSD)", value: "BSD" },
  { label: "Bahraini dinars (BHD)", value: "BHD" },
  { label: "Burundian francs (BIF)", value: "BIF" },
  { label: "Belarusian rubles (BYN)", value: "BYN" },
  { label: "Belize dollars (BZD)", value: "BZD" },
  { label: "Bermudan dollars (BMD)", value: "BMD" },
  { label: "Bhutanese ngultrums (BTN)", value: "BTN" },
  { label: "Bosnia-Herzegovina convertible marks (BAM)", value: "BAM" },
  { label: "Brazilian reals (BRL)", value: "BRL" },
  { label: "Bolivian bolivianos (BOB)", value: "BOB" },
  { label: "Botswanan pulas (BWP)", value: "BWP" },
  { label: "Brunei dollars (BND)", value: "BND" },
  { label: "Bulgarian leva (BGN)", value: "BGN" },
  { label: "Myanmar kyats (MMK)", value: "MMK" },
  { label: "Cambodian riels (KHR)", value: "KHR" },
  { label: "Cape Verdean escudos (CVE)", value: "CVE" },
  { label: "Cayman Islands dollars (KYD)", value: "KYD" },
  { label: "Central African CFA francs (XAF)", value: "XAF" },
  { label: "Chilean pesos (CLP)", value: "CLP" },
  { label: "Chinese yuan (CNY)", value: "CNY" },
  { label: "Colombian pesos (COP)", value: "COP" },
  { label: "Comorian francs (KMF)", value: "KMF" },
  { label: "Congolese francs (CDF)", value: "CDF" },
  { label: "Costa Rican colóns (CRC)", value: "CRC" },
  { label: "Croatian kunas (HRK)", value: "HRK" },
  { label: "Czech korunas (CZK)", value: "CZK" },
  { label: "Danish kroner (DKK)", value: "DKK" },
  { label: "Djiboutian francs (DJF)", value: "DJF" },
  { label: "Dominican pesos (DOP)", value: "DOP" },
  { label: "East Caribbean dollars (XCD)", value: "XCD" },
  { label: "Egyptian pounds (EGP)", value: "EGP" },
  { label: "Eritrean nakfas (ERN)", value: "ERN" },
  { label: "Ethiopian birrs (ETB)", value: "ETB" },
  { label: "Falkland Islands pounds (FKP)", value: "FKP" },
  { label: "CFP francs (XPF)", value: "XPF" },
  { label: "Fijian dollars (FJD)", value: "FJD" },
  { label: "Gibraltar pounds (GIP)", value: "GIP" },
  { label: "Gambian dalasis (GMD)", value: "GMD" },
  { label: "Ghanaian cedis (GHS)", value: "GHS" },
  { label: "Guatemalan quetzals (GTQ)", value: "GTQ" },
  { label: "Guyanaese dollars (GYD)", value: "GYD" },
  { label: "Georgian laris (GEL)", value: "GEL" },
  { label: "Guinean francs (GNF)", value: "GNF" },
  { label: "Haitian gourdes (HTG)", value: "HTG" },
  { label: "Honduran lempiras (HNL)", value: "HNL" },
  { label: "Hong Kong dollars (HKD)", value: "HKD" },
  { label: "Hungarian forints (HUF)", value: "HUF" },
  { label: "Icelandic krónur (ISK)", value: "ISK" },
  { label: "Indian rupees (INR)", value: "INR" },
  { label: "Indonesian rupiahs (IDR)", value: "IDR" },
  { label: "Israeli new shekels (ILS)", value: "ILS" },
  { label: "Iranian rials (IRR)", value: "IRR" },
  { label: "Iraqi dinars (IQD)", value: "IQD" },
  { label: "Jamaican dollars (JMD)", value: "JMD" },
  { label: "Japanese yen (JPY)", value: "JPY" },
  { label: "JEP (JEP)", value: "JEP" },
  { label: "Jordanian dinars (JOD)", value: "JOD" },
  { label: "Kazakhstani tenges (KZT)", value: "KZT" },
  { label: "Kenyan shillings (KES)", value: "KES" },
  { label: "KID (KID)", value: "KID" },
  { label: "Kuwaiti dinars (KWD)", value: "KWD" },
  { label: "Kyrgystani soms (KGS)", value: "KGS" },
  { label: "Laotian kips (LAK)", value: "LAK" },
  { label: "LVL (LVL)", value: "LVL" },
  { label: "Lebanese pounds (LBP)", value: "LBP" },
  { label: "Lesotho lotis (LSL)", value: "LSL" },
  { label: "Liberian dollars (LRD)", value: "LRD" },
  { label: "Libyan dinars (LYD)", value: "LYD" },
  { label: "LTL (LTL)", value: "LTL" },
  { label: "Malagasy ariaries (MGA)", value: "MGA" },
  { label: "Macedonian denari (MKD)", value: "MKD" },
  { label: "Macanese patacas (MOP)", value: "MOP" },
  { label: "Malawian kwachas (MWK)", value: "MWK" },
  { label: "Maldivian rufiyaas (MVR)", value: "MVR" },
  { label: "Mauritanian ouguiyas (MRU)", value: "MRU" },
  { label: "Mexican pesos (MXN)", value: "MXN" },
  { label: "Malaysian ringgits (MYR)", value: "MYR" },
  { label: "Mauritian rupees (MUR)", value: "MUR" },
  { label: "Moldovan lei (MDL)", value: "MDL" },
  { label: "Moroccan dirhams (MAD)", value: "MAD" },
  { label: "Mongolian tugriks (MNT)", value: "MNT" },
  { label: "Mozambican meticals (MZN)", value: "MZN" },
  { label: "Namibian dollars (NAD)", value: "NAD" },
  { label: "Nepalese rupees (NPR)", value: "NPR" },
  { label: "Netherlands Antillean guilders (ANG)", value: "ANG" },
  { label: "New Zealand dollars (NZD)", value: "NZD" },
  { label: "Nicaraguan córdobas (NIO)", value: "NIO" },
  { label: "Nigerian nairas (NGN)", value: "NGN" },
  { label: "Norwegian kroner (NOK)", value: "NOK" },
  { label: "Omani rials (OMR)", value: "OMR" },
  { label: "Panamanian balboas (PAB)", value: "PAB" },
  { label: "Pakistani rupees (PKR)", value: "PKR" },
  { label: "Papua New Guinean kina (PGK)", value: "PGK" },
  { label: "Paraguayan guaranis (PYG)", value: "PYG" },
  { label: "Peruvian soles (PEN)", value: "PEN" },
  { label: "Philippine pesos (PHP)", value: "PHP" },
  { label: "Polish zlotys (PLN)", value: "PLN" },
  { label: "Qatari riyals (QAR)", value: "QAR" },
  { label: "Romanian lei (RON)", value: "RON" },
  { label: "Russian rubles (RUB)", value: "RUB" },
  { label: "Rwandan francs (RWF)", value: "RWF" },
  { label: "Samoan tala (WST)", value: "WST" },
  { label: "St. Helena pounds (SHP)", value: "SHP" },
  { label: "Saudi riyals (SAR)", value: "SAR" },
  { label: "Serbian dinars (RSD)", value: "RSD" },
  { label: "Seychellois rupees (SCR)", value: "SCR" },
  { label: "Sierra Leonean leones (1964—2 (SLL)", value: "SLL" },
  { label: "Singapore dollars (SGD)", value: "SGD" },
  { label: "Sudanese pounds (SDG)", value: "SDG" },
  { label: "Somali shillings (SOS)", value: "SOS" },
  { label: "Syrian pounds (SYP)", value: "SYP" },
  { label: "South African rand (ZAR)", value: "ZAR" },
  { label: "South Korean won (KRW)", value: "KRW" },
  { label: "South Sudanese pounds (SSP)", value: "SSP" },
  { label: "Solomon Islands dollars (SBD)", value: "SBD" },
  { label: "Sri Lankan rupees (LKR)", value: "LKR" },
  { label: "Surinamese dollars (SRD)", value: "SRD" },
  { label: "Swazi emalangeni (SZL)", value: "SZL" },
  { label: "Swedish kronor (SEK)", value: "SEK" },
  { label: "Swiss francs (CHF)", value: "CHF" },
  { label: "New Taiwan dollars (TWD)", value: "TWD" },
  { label: "Thai baht (THB)", value: "THB" },
  { label: "Tajikistani somonis (TJS)", value: "TJS" },
  { label: "Tanzanian shillings (TZS)", value: "TZS" },
  { label: "Tongan paʻanga (TOP)", value: "TOP" },
  { label: "Trinidad & Tobago dollars (TTD)", value: "TTD" },
  { label: "Tunisian dinars (TND)", value: "TND" },
  { label: "Turkish Lira (TRY)", value: "TRY" },
  { label: "Turkmenistani manat (TMT)", value: "TMT" },
  { label: "Ugandan shillings (UGX)", value: "UGX" },
  { label: "Ukrainian hryvnias (UAH)", value: "UAH" },
  { label: "UAE dirhams (AED)", value: "AED" },
  { label: "Uruguayan pesos (UYU)", value: "UYU" },
  { label: "Uzbekistani som (UZS)", value: "UZS" },
  { label: "Vanuatu vatus (VUV)", value: "VUV" },
  { label: "Venezuelan bolívars (VES)", value: "VES" },
  { label: "Vietnamese dong (VND)", value: "VND" },
  { label: "West African CFA francs (XOF)", value: "XOF" },
  { label: "Yemeni rials (YER)", value: "YER" },
  { label: "Zambian kwachas (ZMW)", value: "ZMW" },
  { label: "BYR (BYR)", value: "BYR" },
  { label: "STD (STD)", value: "STD" },
  { label: "São Tomé & Príncipe dobras (STN)", value: "STN" },
  { label: "VED (VED)", value: "VED" },
  { label: "VEF (VEF)", value: "VEF" },
  { label: "XXX (XXX)", value: "XXX" },
];
