import './Project.css';

interface ProjectProps {
  Data: JSON;
}

export default function Project({ Data }) {
  return (
    <div className="project_wrapper">
      <div className="project_header">
        <div className="project_header_blur">
          <div className="project_header_blur_blur"></div>
        </div>
        <img
          className="project_header_image"
          src={`./projects/${Data.title}/${Data.coverImg}`}
        />
      </div>
      <div className="project_body">
        <div className="project_body_header">
          <div className="project_body_logo">
            {Data.icon ? (
              <img className="project_body_logo_image" src={`./projects/${Data.title}/${Data.icon}`} />
            ) : (
              <p>R</p>
            )}
          </div>
          <h3>{Data.title || ''}</h3>
        </div>
        <div className="project_body_badges">
          {Data.badges.map((badge, index) => {
            return <div className={`badge ${badge}`}>{badge}</div>;
          })}
        </div>

        <p className="project_body_description">{Data.description}</p>
      </div>
    </div>
  );
}
