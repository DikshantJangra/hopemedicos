import type React from "react";

type SectionHeaderProps = {
  icon?: React.ReactNode;
  preHeading: string;
  highlight?: string;
};

const SectionHeader = ({ icon, preHeading, highlight = "" }: SectionHeaderProps) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center text-base font-normal text-center">
        {/* Preheading Badge */}
        <div className="flex justify-center items-center tracking-wider gap-2 bg-black/10 px-3 py-1 rounded-lg mb-12 text-sm sm:text-base">
            {icon && <span className="text-xl">{icon}</span>}
            <span>
                {highlight ? (
                <>
                    {preHeading} <span className="text-[#9E79FF]">{highlight}</span>
                </>
                ) : (
                preHeading
                )}
            </span>
        </div>
    </div>
  );
};

export default SectionHeader;