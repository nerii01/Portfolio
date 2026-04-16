import './Collage.css'

interface CollageProps {
  Left: React.ReactNode;
  Right: React.ReactNode;
}
export default function Collage({ Left, Right }: CollageProps) {
  return (
    <div className="collage_wrapper">
      <div className="collage_left">{Left}</div>
      <div className="collage_right">{Right}</div>
    </div>
  );
}
