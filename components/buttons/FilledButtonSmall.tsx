export default function FilledButton({
  children,
  onClick,
  bgClass = "bg-neutral-700",
}: {
  bgClass?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={`select-none rounded-lg ${bgClass}
      py-1.5 px-2 text-center align-middle font-sans text-xs border-2 border-neutral-500
      font-bold text-white shadow-md shadow-neutral-900/10
      transition-all hover:shadow-lg hover:shadow-neutral-900/20
      focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]
      active:shadow-none disabled:pointer-events-none disabled:opacity-50
      disabled:shadow-none`}
      type="button"
    >
      {children}
    </button>
  );
}

// "use client";

// import enTranslations from "@shopify/polaris/locales/en.json";
// import { AppProvider, Button } from "@shopify/polaris";
// import "@shopify/polaris/build/esm/styles.css";

// export default function FilledButton({
//   children,
//   onClick,
// }: {
//   bgClass?: string;
//   children: any;
//   onClick?: any;
// }) {
//   return (
//     <AppProvider i18n={enTranslations}>
//       <Button variant="primary" onClick={onClick}>
//         {children}
//       </Button>
//     </AppProvider>
//   );
// }
