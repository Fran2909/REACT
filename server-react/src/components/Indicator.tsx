interface IndicatorProps {
  isOn: boolean;
}
function Indicator({ isOn }: IndicatorProps) {
  return (
    <div className="max-w-[300px]">
      <img
        src={`${
          isOn
            ? "https://t3.ftcdn.net/jpg/05/35/93/24/360_F_535932485_u430DXvoSGUn4Remf8f8oDP9wOb76eWZ.webp"
            : "https://t4.ftcdn.net/jpg/05/35/93/25/360_F_535932503_CaLoPwuMeB0pyCGwnKK6VSHlNyuHEVhF.png"
        }`}
        alt=""
        className="scale-[.3] hover:scale-[.4] transition-all"
      />
    </div>
  );
}

export default Indicator;
