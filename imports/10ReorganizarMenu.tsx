import svgPaths from "./svg-ifuw3o4myw";
import imgLogoBandeja1 from "figma:asset/bc62b5925d24c95a866b9e3e8ba92818d8dd2df9.png";

function MoreVertFilled() {
  return (
    <div className="relative size-full" data-name="MoreVertFilled">
      <div
        className="absolute bottom-[16.667%] left-[41.667%] right-[41.667%] top-[16.667%]"
        data-name="Vector"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 4 16"
        >
          <path
            d={svgPaths.p56f6880}
            fill="var(--fill-0, #757575)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function FilledNavigationExpandMore() {
  return (
    <div
      className="relative size-full"
      data-name="filled/navigation/expand-more"
    >
      <div
        className="absolute bottom-[33.333%] left-1/4 right-1/4 top-[35.792%]"
        data-name="Vector"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 15 10"
        >
          <path
            d={svgPaths.p3bc3ec00}
            fill="var(--fill-0, #002250)"
            id="Vector"
          />
        </svg>
      </div>
      <div className="absolute inset-0" data-name="Vector">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 32 32"
        >
          <g id="Vector"></g>
        </svg>
      </div>
    </div>
  );
}

function FilledAlertAddAlert() {
  return (
    <div className="relative size-full" data-name="filled/alert/add-alert">
      <div className="absolute inset-0" data-name="Vector">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 32 32"
        >
          <g id="Vector"></g>
        </svg>
      </div>
      <div
        className="absolute bottom-[12.5%] left-[12.5%] right-[4.167%] top-[8.333%]"
        data-name="Vector"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 20 19"
        >
          <path
            d={svgPaths.p13bca600}
            fill="var(--fill-0, #757575)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function SettingsFilled() {
  return (
    <div className="relative size-full" data-name="SettingsFilled">
      <div
        className="absolute bottom-[4.737%] left-[5.829%] right-[16.355%] top-[15.263%]"
        data-name="Vector"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 24 24"
        >
          <path
            d={svgPaths.p3e40aa80}
            fill="var(--fill-0, #757575)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function MoreVertFilled1() {
  return (
    <div
      className="absolute bottom-[74.167%] left-[61.25%] right-[37.083%] top-[23.611%]"
      data-name="MoreVertFilled"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="MoreVertFilled">
          <path
            d={svgPaths.p3fdba000}
            fill="var(--fill-0, #757575)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function BadgeMaximumNumber() {
  return (
    <div
      className="bg-[#1a73e8] box-border content-stretch flex flex-row items-center justify-center px-[6.5px] py-0 relative rounded-[10px] shrink-0"
      data-name="Badge / Maximum Number"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-center text-nowrap tracking-[0.4px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[20px] whitespace-pre">
          1
        </p>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-start justify-start p-0 size-[21px] translate-x-[-50%] translate-y-[-50%]"
      data-name="Badge"
      style={{ top: "calc(50% - 294.5px)", left: "calc(50% + 637.5px)" }}
    >
      <BadgeMaximumNumber />
    </div>
  );
}

function Card2() {
  return (
    <div
      className="absolute contents left-[873px] top-[235px]"
      data-name="Card-2"
    >
      <div className="absolute bg-[#ffffff] h-[185px] left-[873px] rounded-[10px] top-[238px] w-[486px]">
        <div className="absolute border border-[rgba(176,176,176,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div
        className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal h-6 justify-center leading-[0] left-[912px] text-[#002250] text-[12px] text-left top-[267px] tracking-[0.15px] translate-y-[-50%] w-32"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[1.5]">
          (Grupo de procesos)
        </p>
      </div>
      <div
        className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal h-6 justify-center leading-[0] left-[917px] text-[#757575] text-[11px] text-left top-[316px] tracking-[0.15px] translate-y-[-50%] w-32"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[1.5]">Descripción</p>
      </div>
      <MoreVertFilled1 />
      <Badge />
    </div>
  );
}

function MoreVertFilled2() {
  return (
    <div
      className="absolute bottom-[47.963%] left-[61.042%] right-[37.292%] top-[49.815%]"
      data-name="MoreVertFilled"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="MoreVertFilled">
          <path
            d={svgPaths.p3fdba000}
            fill="var(--fill-0, #757575)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function BadgeMaximumNumber1() {
  return (
    <div
      className="bg-[#1a73e8] box-border content-stretch flex flex-row items-center justify-center px-[6.5px] py-0 relative rounded-[10px] shrink-0"
      data-name="Badge / Maximum Number"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-center text-nowrap tracking-[0.4px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[20px] whitespace-pre">
          1
        </p>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-start justify-start p-0 size-[21px] translate-x-[-50%] translate-y-[-50%]"
      data-name="Badge"
      style={{ top: "calc(50% - 12.5px)", left: "calc(50% + 637.5px)" }}
    >
      <BadgeMaximumNumber1 />
    </div>
  );
}

function Card3() {
  return (
    <div
      className="absolute contents left-[873px] top-[517px]"
      data-name="Card-2"
    >
      <div className="absolute bg-[#ffffff] h-[185px] left-[873px] rounded-[10px] top-[523px] w-[486px]">
        <div className="absolute border border-[rgba(176,176,176,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div
        className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal h-6 justify-center leading-[0] left-[909px] text-[#002250] text-[12px] text-left top-[550px] tracking-[0.15px] translate-y-[-50%] w-32"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[1.5]">
          (Grupo de procesos)
        </p>
      </div>
      <div
        className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal h-6 justify-center leading-[0] left-[914px] text-[#757575] text-[11px] text-left top-[599px] tracking-[0.15px] translate-y-[-50%] w-32"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[1.5]">Descripción</p>
      </div>
      <MoreVertFilled2 />
      <Badge1 />
    </div>
  );
}

function BadgeMaximumNumber2() {
  return (
    <div
      className="bg-[#1a73e8] box-border content-stretch flex flex-row items-center justify-center px-[6.5px] py-0 relative rounded-[10px] shrink-0"
      data-name="Badge / Maximum Number"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-center text-nowrap tracking-[0.4px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[20px] whitespace-pre">
          1
        </p>
      </div>
    </div>
  );
}

function Badge2() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-start justify-start p-0 size-[21px] translate-x-[-50%] translate-y-[-50%]"
      data-name="Badge"
      style={{ top: "calc(50% - 295.5px)", left: "calc(50% + 58.5px)" }}
    >
      <BadgeMaximumNumber2 />
    </div>
  );
}

function FilledNavigationExpandMore1() {
  return (
    <div
      className="relative size-[30px]"
      data-name="filled/navigation/expand-more"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
      >
        <g clipPath="url(#clip0_1_7649)" id="filled/navigation/expand-more">
          <path
            d={svgPaths.p3ac68f00}
            fill="var(--fill-0, #002250)"
            id="Vector"
          />
          <g id="Vector_2"></g>
        </g>
        <defs>
          <clipPath id="clip0_1_7649">
            <rect fill="white" height="30" width="30" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Card1() {
  return (
    <div
      className="absolute contents left-[295px] top-[197px]"
      data-name="Card-1"
    >
      <div
        className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal h-3 justify-center leading-[0] left-[342px] text-[#002250] text-[18px] text-left top-[212px] tracking-[0.15px] translate-y-[-50%] w-[110px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[1.5]">(Aplicación)</p>
      </div>
      <div className="absolute bg-[#ffffff] h-[185px] left-[295px] rounded-[10px] top-[238px] w-[486px]">
        <div className="absolute border border-[rgba(176,176,176,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div
        className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal h-6 justify-center leading-[0] left-[335px] text-[#002250] text-[12px] text-left top-[265px] tracking-[0.15px] translate-y-[-50%] w-32"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[1.5]">
          (Grupo de procesos)
        </p>
      </div>
      <div
        className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal h-6 justify-center leading-[0] left-[340px] text-[#757575] text-[11px] text-left top-[314px] tracking-[0.15px] translate-y-[-50%] w-32"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[1.5]">Descripción</p>
      </div>
      <div
        className="absolute bottom-[74.352%] left-[21.181%] overflow-clip right-[77.153%] top-[23.426%]"
        data-name="MoreVertFilled"
      >
        <MoreVertFilled />
      </div>
      <Badge2 />
      <div
        className="absolute left-[295px] overflow-clip size-[30px] top-[197px]"
        data-name="filled/navigation/expand-more"
      >
        <FilledNavigationExpandMore />
      </div>
      <div
        className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal h-3 justify-center leading-[0] left-[340px] text-[#002250] text-[18px] text-left top-[772px] tracking-[0.15px] translate-y-[-50%] w-[110px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[1.5]">(Otra App)</p>
      </div>
      <div className="absolute flex h-[30px] items-center justify-center left-[299px] top-[758px] w-[30px]">
        <div className="flex-none rotate-[270deg]">
          <FilledNavigationExpandMore1 />
        </div>
      </div>
      <div
        className="absolute bottom-[79.444%] left-[31.875%] overflow-clip right-[66.458%] top-[18.333%]"
        data-name="filled/alert/add-alert"
      >
        <FilledAlertAddAlert />
      </div>
    </div>
  );
}

function MoreVertFilled3() {
  return (
    <div
      className="absolute bottom-[47.963%] left-[21.597%] right-[76.736%] top-[49.815%]"
      data-name="MoreVertFilled"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="MoreVertFilled">
          <path
            d={svgPaths.p3fdba000}
            fill="var(--fill-0, #757575)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function BadgeMaximumNumber3() {
  return (
    <div
      className="bg-[#1a73e8] box-border content-stretch flex flex-row items-center justify-center px-[6.5px] py-0 relative rounded-[10px] shrink-0"
      data-name="Badge / Maximum Number"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-center text-nowrap tracking-[0.4px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[20px] whitespace-pre">
          1
        </p>
      </div>
    </div>
  );
}

function Badge3() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-start justify-start p-0 size-[21px] translate-x-[-50%] translate-y-[-50%]"
      data-name="Badge"
      style={{ top: "calc(50% - 12.5px)", left: "calc(50% + 58.5px)" }}
    >
      <BadgeMaximumNumber3 />
    </div>
  );
}

function BadgeMaximumNumber4() {
  return (
    <div
      className="bg-[#1a73e8] box-border content-stretch flex flex-row items-center justify-center px-[6.5px] py-0 relative rounded-[10px] shrink-0"
      data-name="Badge / Maximum Number"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-center text-nowrap tracking-[0.4px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[20px] whitespace-pre">
          1
        </p>
      </div>
    </div>
  );
}

function Badge4() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-start justify-start p-0 size-[21px] translate-x-[-50%] translate-y-[-50%]"
      data-name="Badge"
      style={{ top: "calc(50% + 234.5px)", left: "calc(50% - 252.5px)" }}
    >
      <BadgeMaximumNumber4 />
    </div>
  );
}

function FilledNavigationExpandMore2() {
  return (
    <div
      className="absolute left-[301px] size-[30px] top-[482px]"
      data-name="filled/navigation/expand-more"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
      >
        <g clipPath="url(#clip0_1_7680)" id="filled/navigation/expand-more">
          <path
            d={svgPaths.p3ac68f00}
            fill="var(--fill-0, #002250)"
            id="Vector"
          />
          <g id="Vector_2"></g>
        </g>
        <defs>
          <clipPath id="clip0_1_7680">
            <rect fill="white" height="30" width="30" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function FilledAlertAddAlert1() {
  return (
    <div
      className="absolute bottom-[52.87%] left-[38.056%] right-[60.278%] top-[44.907%]"
      data-name="filled/alert/add-alert"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_1_7662)" id="filled/alert/add-alert">
          <g id="Vector"></g>
          <path
            d={svgPaths.p15bf8671}
            fill="var(--fill-0, #757575)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_7662">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Card4() {
  return (
    <div
      className="absolute contents left-[295px] top-[482px]"
      data-name="Card-1"
    >
      <div
        className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal h-3 justify-center leading-[0] left-[348px] text-[#002250] text-[18px] text-left top-[497px] tracking-[0.15px] translate-y-[-50%] w-[185px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[1.5]">
          Actos Administrativos
        </p>
      </div>
      <div className="absolute bg-[#ffffff] h-[185px] left-[295px] rounded-[10px] top-[523px] w-[486px]">
        <div className="absolute border border-[rgba(176,176,176,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div
        className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal h-6 justify-center leading-[0] left-[341px] text-[#002250] text-[12px] text-left top-[550px] tracking-[0.15px] translate-y-[-50%] w-32"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[1.5]">
          (Grupo de procesos)
        </p>
      </div>
      <div
        className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal h-6 justify-center leading-[0] left-[346px] text-[#757575] text-[11px] text-left top-[599px] tracking-[0.15px] translate-y-[-50%] w-32"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[1.5]">Descripción</p>
      </div>
      <MoreVertFilled3 />
      <Badge3 />
      <Badge4 />
      <FilledNavigationExpandMore2 />
      <FilledAlertAddAlert1 />
    </div>
  );
}

function Contenido() {
  return (
    <div
      className="absolute contents left-[295px] top-[139px]"
      data-name="Contenido"
    >
      <Card2 />
      <Card3 />
      <Card1 />
      <Card4 />
      <div
        className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium h-6 justify-center leading-[0] left-[295px] text-[#002250] text-[18px] text-left top-[151px] tracking-[0.15px] translate-y-[-50%] w-[87px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[1.5]">Bandeja</p>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div
      className="absolute left-[1369px] size-[35px] top-16"
      data-name="Avatar"
    >
      <div className="absolute inset-0" data-name="avatar-bg">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 35 35"
        >
          <circle
            cx="17.5"
            cy="17.5"
            fill="var(--fill-0, #1A73E8)"
            id="avatar-bg"
            r="17.5"
          />
        </svg>
      </div>
      <div
        className="absolute bottom-[27.143%] flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] left-[34.643%] right-[36.786%] text-[16px] text-center text-neutral-50 text-nowrap top-[27.143%]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[16px] whitespace-pre">T</p>
      </div>
    </div>
  );
}

function SearchFilled() {
  return (
    <div className="relative shrink-0 size-6" data-name="SearchFilled">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="SearchFilled">
          <path
            d={svgPaths.p172da900}
            fill="var(--fill-0, #757575)"
            id="Vector"
            stroke="var(--stroke-0, #1A73E8)"
          />
        </g>
      </svg>
    </div>
  );
}

function AdornStartContainer() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-px items-center justify-start pl-0 pr-2 py-0 relative shrink-0"
      data-name="Adorn. Start Container"
    >
      <SearchFilled />
    </div>
  );
}

function MinHeight() {
  return (
    <div
      className="h-6 shrink-0"
      data-name="min-height"
      style={{ width: "1.04907e-06px" }}
    />
  );
}

function MinWidth() {
  return <div className="h-0 shrink-0 w-6" data-name="min-width" />;
}

function FilterListFilled() {
  return (
    <div className="relative shrink-0 size-6" data-name="FilterListFilled">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="FilterListFilled">
          <path
            d={svgPaths.p306ba380}
            fill="var(--fill-0, #757575)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function AdornEndContainer() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-px items-center justify-start p-0 right-0 top-1/2 translate-y-[-50%]"
      data-name="Adorn. End Container"
    >
      <FilterListFilled />
    </div>
  );
}

function Content() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start overflow-clip px-0 py-2 relative shrink-0 w-full"
      data-name="Content"
    >
      <AdornStartContainer />
      <MinHeight />
      <div
        className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#757575] text-[16px] text-left tracking-[0.15px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px]">&nbsp;</p>
      </div>
      <MinWidth />
      <AdornEndContainer />
    </div>
  );
}

function LabelContainer() {
  return (
    <div
      className="absolute bg-[#ffffff] box-border content-stretch flex flex-row gap-2.5 h-0.5 items-center justify-start left-3 px-1 py-0 top-0"
      data-name="Label Container"
    >
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#757575] text-[12px] text-left text-nowrap tracking-[0.15px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[12px] whitespace-pre">
          Buscar....
        </p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="relative rounded shrink-0 w-full" data-name="Input">
      <div className="absolute border border-[#757575] border-solid inset-0 pointer-events-none rounded" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start px-3 py-0 relative w-full">
          <Content />
          <LabelContainer />
        </div>
      </div>
    </div>
  );
}

function TextField() {
  return (
    <div
      className="absolute bg-[#ffffff] box-border content-stretch flex flex-col h-11 items-start justify-start left-[296px] p-0 top-[59px] w-[486px]"
      data-name="<TextField>"
    >
      <Input />
    </div>
  );
}

function Header() {
  return (
    <div
      className="absolute contents left-[262px] top-[35px]"
      data-name="Header"
    >
      <div
        className="absolute bg-[#ffffff] h-[86px] left-[262px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] top-[35px] w-[1181px]"
        data-name="Barra"
      />
      <div
        className="absolute bottom-[90.833%] left-[92.083%] overflow-clip right-[5.833%] top-[6.389%]"
        data-name="SettingsFilled"
      >
        <SettingsFilled />
      </div>
      <Avatar />
      <TextField />
    </div>
  );
}

function HomeFilled() {
  return (
    <div className="relative shrink-0 size-6" data-name="HomeFilled">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="HomeFilled">
          <path
            d={svgPaths.p2528e580}
            fill="var(--fill-0, #757575)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function LeftSlot() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start pl-0 pr-4 py-0 relative shrink-0"
      data-name="Left Slot"
    >
      <HomeFilled />
    </div>
  );
}

function Container() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0"
      data-name="Container"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#757575] text-[16px] text-left text-nowrap tracking-[0.15px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">
          Inicio
        </p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start overflow-clip px-4 py-1.5 relative shrink-0"
      data-name="Container"
    >
      <LeftSlot />
      <Container />
    </div>
  );
}

function MenuItem() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-center p-0 relative shrink-0 w-full"
      data-name="<MenuItem>"
    >
      <Container1 />
    </div>
  );
}

function SpaceDashboardOutlined() {
  return (
    <div
      className="relative shrink-0 size-6"
      data-name="SpaceDashboardOutlined"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="SpaceDashboardOutlined">
          <path
            d={svgPaths.p196e8c80}
            fill="var(--fill-0, #1A73E8)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function LeftSlot1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start pl-0 pr-4 py-0 relative shrink-0"
      data-name="Left Slot"
    >
      <SpaceDashboardOutlined />
    </div>
  );
}

function Container2() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0"
      data-name="Container"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#1a73e8] text-[16px] text-left text-nowrap tracking-[0.15px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">
          Bandeja
        </p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start overflow-clip px-4 py-1.5 relative shrink-0"
      data-name="Container"
    >
      <LeftSlot1 />
      <Container2 />
    </div>
  );
}

function MenuItem1() {
  return (
    <div
      className="bg-[rgba(26,115,232,0.2)] box-border content-stretch flex flex-col items-start justify-center p-0 relative shrink-0 w-full"
      data-name="<MenuItem>"
    >
      <Container3 />
    </div>
  );
}

function Group() {
  return (
    <div
      className="absolute bottom-[20.833%] left-[12.5%] right-[12.5%] top-[20.833%]"
      data-name="Group"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 14"
      >
        <g id="Group">
          <path
            d={svgPaths.p116c5700}
            fill="var(--fill-0, #757575)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function ViewModuleFilled() {
  return (
    <div
      className="overflow-clip relative shrink-0 size-6"
      data-name="ViewModuleFilled"
    >
      <Group />
    </div>
  );
}

function Icon() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0"
      data-name="Icon"
    >
      <ViewModuleFilled />
    </div>
  );
}

function LeftSlot2() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start pl-0 pr-4 py-0 relative shrink-0"
      data-name="Left Slot"
    >
      <Icon />
    </div>
  );
}

function Container4() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0"
      data-name="Container"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#757575] text-[16px] text-left text-nowrap tracking-[0.15px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">
          APPS
        </p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start overflow-clip px-4 py-1.5 relative shrink-0"
      data-name="Container"
    >
      <LeftSlot2 />
      <Container4 />
    </div>
  );
}

function MenuItem2() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-center p-0 relative shrink-0 w-full"
      data-name="<MenuItem>"
    >
      <Container5 />
    </div>
  );
}

function LayersFilled() {
  return (
    <div className="relative shrink-0 size-6" data-name="LayersFilled">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="LayersFilled">
          <path
            d={svgPaths.p18cdf880}
            fill="var(--fill-0, #757575)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function LeftSlot3() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start pl-0 pr-4 py-0 relative shrink-0"
      data-name="Left Slot"
    >
      <LayersFilled />
    </div>
  );
}

function Container6() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0"
      data-name="Container"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#757575] text-[16px] text-left text-nowrap tracking-[0.15px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">
          ERP
        </p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start overflow-clip px-4 py-1.5 relative shrink-0"
      data-name="Container"
    >
      <LeftSlot3 />
      <Container6 />
    </div>
  );
}

function MinHeight1() {
  return <div className="h-px w-0" data-name="min-height" />;
}

function DividerHorizontal() {
  return (
    <div
      className="absolute bottom-0 box-border content-stretch flex flex-col items-start justify-start left-0 p-0 right-0"
      data-name="<Divider> | Horizontal"
    >
      <div
        className="flex items-center justify-center relative shrink-0"
        style={
          {
            "--transform-inner-width": "0",
            "--transform-inner-height": "1",
            width:
              "calc(1px * ((var(--transform-inner-height) * 0) + (var(--transform-inner-width) * 0)))",
          } as React.CSSProperties
        }
      >
        <div className="flex-none scale-x-[0%]">
          <MinHeight1 />
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 241 1"
          >
            <line
              id="Divider"
              stroke="var(--stroke-0, black)"
              strokeOpacity="0.12"
              x2="241"
              y1="0.5"
              y2="0.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MenuItem3() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-center p-0 relative shrink-0 w-full"
      data-name="<MenuItem>"
    >
      <Container7 />
      <DividerHorizontal />
    </div>
  );
}

function Container8() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0"
      data-name="Container"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#757575] text-[16px] text-left text-nowrap tracking-[0.15px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">
          Favoritos
        </p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start overflow-clip px-4 py-1.5 relative shrink-0"
      data-name="Container"
    >
      <Container8 />
    </div>
  );
}

function MenuItem4() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-center p-0 relative shrink-0 w-full"
      data-name="<MenuItem>"
    >
      <Container9 />
    </div>
  );
}

function StarHalfFilled() {
  return (
    <div className="relative shrink-0 size-6" data-name="StarHalfFilled">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="StarHalfFilled">
          <path
            d={svgPaths.p258f6200}
            fill="var(--fill-0, #757575)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function LeftSlot5() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start pl-0 pr-4 py-0 relative shrink-0"
      data-name="Left Slot"
    >
      <StarHalfFilled />
    </div>
  );
}

function Container10() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0"
      data-name="Container"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#757575] text-[16px] text-left text-nowrap tracking-[0.15px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">
          Aplicación 1
        </p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start overflow-clip px-4 py-1.5 relative shrink-0"
      data-name="Container"
    >
      <LeftSlot5 />
      <Container10 />
    </div>
  );
}

function MenuItem5() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-center p-0 relative shrink-0 w-full"
      data-name="<MenuItem>"
    >
      <Container11 />
    </div>
  );
}

function StarHalfFilled1() {
  return (
    <div className="relative shrink-0 size-6" data-name="StarHalfFilled">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="StarHalfFilled">
          <path
            d={svgPaths.p258f6200}
            fill="var(--fill-0, #757575)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function LeftSlot6() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start pl-0 pr-4 py-0 relative shrink-0"
      data-name="Left Slot"
    >
      <StarHalfFilled1 />
    </div>
  );
}

function Container12() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0"
      data-name="Container"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#757575] text-[16px] text-left text-nowrap tracking-[0.15px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[1.5] whitespace-pre">
          Aplicación 2
        </p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start overflow-clip px-4 py-1.5 relative shrink-0"
      data-name="Container"
    >
      <LeftSlot6 />
      <Container12 />
    </div>
  );
}

function MenuItem6() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-center p-0 relative shrink-0 w-full"
      data-name="<MenuItem>"
    >
      <Container13 />
    </div>
  );
}

function MenuList() {
  return (
    <div className="relative rounded shrink-0 w-full" data-name="<MenuList>">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start px-1 py-2 relative w-full">
          <MenuItem />
          <MenuItem1 />
          <MenuItem2 />
          <MenuItem3 />
          <MenuItem4 />
          <MenuItem5 />
          <MenuItem6 />
        </div>
      </div>
    </div>
  );
}

function Paper() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col items-start justify-start overflow-clip p-0 relative rounded shrink-0 w-full"
      data-name="<Paper>"
    >
      <MenuList />
    </div>
  );
}

function Menu() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col h-[304px] items-start justify-start left-2.5 p-0 top-[133px] w-[249px]"
      data-name="<Menu>"
    >
      <Paper />
    </div>
  );
}

function BotonDesplegar() {
  return (
    <div
      className="absolute left-[244px] size-[30px] top-[81px]"
      data-name="BotonDesplegar"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
      >
        <g id="BotonDesplegar">
          <circle
            cx="15"
            cy="15"
            fill="var(--fill-0, white)"
            id="Ellipse 1"
            r="14.5"
            stroke="var(--stroke-0, #757575)"
          />
          <path
            d={svgPaths.p13ee3700}
            fill="var(--fill-0, #757575)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function IconLeft() {
  return (
    <div
      className="absolute left-[-6px] size-6 top-[-1px]"
      data-name="Icon Left"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Icon Left">
          <path
            d={svgPaths.p38d1c00}
            fill="var(--fill-0, #1A73E8)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function MaskedIcon() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[18px]"
      data-name="Masked Icon"
    >
      <IconLeft />
    </div>
  );
}

function Base() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-0 relative shrink-0"
      data-name="Base"
    >
      <MaskedIcon />
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#1a73e8] text-[15px] text-left text-nowrap tracking-[0.46px] uppercase"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[26px] whitespace-pre">
          Radicar
        </p>
      </div>
    </div>
  );
}

function Radicar() {
  return (
    <div
      className="absolute bg-[rgba(26,115,232,0.2)] left-[23px] rounded-[10px] top-[79px] w-48"
      data-name="Radicar"
    >
      <div className="box-border content-stretch flex flex-col items-center justify-center overflow-clip px-[22px] py-2 relative w-48">
        <Base />
      </div>
      <div className="absolute border border-[rgba(26,115,232,0.25)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function FilledNavigationExpandMore3() {
  return (
    <div
      className="relative size-[22px]"
      data-name="filled/navigation/expand-more"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 22 22"
      >
        <g clipPath="url(#clip0_1_7643)" id="filled/navigation/expand-more">
          <path
            d={svgPaths.p3fe466f2}
            fill="var(--fill-0, #757575)"
            id="Vector"
          />
          <g id="Vector_2"></g>
        </g>
        <defs>
          <clipPath id="clip0_1_7643">
            <rect fill="white" height="22" width="22" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SideBar() {
  return (
    <div className="absolute contents left-0 top-0" data-name="SideBar">
      <div className="absolute bg-[#ffffff] h-[1080px] left-0 top-0 w-[261px]" />
      <div
        className="absolute bg-center bg-cover bg-no-repeat h-10 left-[18px] top-3 w-[41px]"
        data-name="logo-bandeja 1"
        style={{ backgroundImage: `url('${imgLogoBandeja1}')` }}
      />
      <div
        className="absolute font-['Roboto:Medium',_sans-serif] font-medium leading-[0] left-[71px] text-[#002250] text-[24px] text-left top-[18px] w-[109px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal]">Synchrox</p>
      </div>
      <div className="absolute flex h-[1080px] items-center justify-center left-[260.5px] top-[1px] w-[0px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[1080px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1080 1"
              >
                <line
                  id="Line 1"
                  stroke="var(--stroke-0, #848282)"
                  strokeOpacity="0.2"
                  x2="1080"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Menu />
      <BotonDesplegar />
      <Radicar />
      <div className="absolute flex h-[22px] items-center justify-center left-[225px] top-[219px] w-[22px]">
        <div className="flex-none rotate-[270deg]">
          <FilledNavigationExpandMore3 />
        </div>
      </div>
    </div>
  );
}

export default function Component10ReorganizarMenu() {
  return (
    <div
      className="bg-neutral-50 relative size-full"
      data-name="1.0 REORGANIZAR MENÚ"
    >
      <div
        className="absolute bg-neutral-50 h-[1087px] left-0 top-0 w-[1440px]"
        data-name="FONDO"
      />
      <Contenido />
      <Header />
      <SideBar />
    </div>
  );
}