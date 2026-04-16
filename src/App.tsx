import CodeSandbox from './components/CodeSandbox/CodeSandbox';
import Code from './assets/codes/UPlayer.cpp?raw';
import Bayer from './assets/codes/BayerMatrix.hlsl?raw';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Project from './components/Project/Project';
import Navbar from './components/Navigation/Navbar/Navbar';

function App() {
  const images = [
    {
      image: '12565.jpg',
      title: 'Bayer',
      description: 'A 16x16 Bayer matrix texture used for dithering.',
    },
    {
      image: 'Bayer.png',
      title: 'Bayer Shader',
      description:
        'A shader using the Bayer matrix texture, implemented in a game.',
    },
    {
      image: 'custom-blur-graph.png',
      title: 'Custom Blur Graph',
      description: 'A custom blur graph created in Unreal Engine Materials.',
    },
    {
      image: 'Unreal.png',
      title: 'Unreal',
      description: 'The Unreal Engine logo.',
    },
    {
      image: 'PerlinNoise.jpg',
      title: 'Perlin',
      description: 'This is the perlin which is used',
    },
    {
      image: 'th_flare_mask.jpg',
      title: 'Perlin',
      description: 'This is the perlin which is used',
    },
    {
      image: 'IMG_5434.jpg',
      title: 'Perlin',
      description: 'This is the perlin which is used',
    },
  ];

  const projects = [
    {
      icon: 'Coffee.png',
      coverImg: 'init.png',
      title: 'Coffee',
      description:
        'A custom version control system built from scratch in C++, featuring commits, branching, diffing, and merging.',
      badges: ['C++', 'Windows', 'CLI', 'In Development'],
    },
    {
      icon: 'Idea Manager.png',
      coverImg: 'idea_manager.png',
      title: 'Idea Manager',
      description:
        'A CLI tool for capturing and organizing ideas on the fly, built in C++ as a deep-dive into multi-file architecture and data persistence.',
      badges: ['C++', 'Windows', 'CLI'],
    },
    {
      icon: '',
      coverImg: 'roguelike.png',
      title: 'Roguelike',
      description:
        'A retro first-person roguelike built in Unreal Engine 5, featuring a custom art style with Bayer matrix dithering, posterization, and mosaic shaders. Targeting a 2027 Steam release.',
      badges: [
        'C++',
        'Unreal Engine',
        'Multiplayer',
        'Steam',
        'In Development',
      ],
    },
  ];

  return (
    <>
      <Navbar/>
      <br></br>
      <br></br>
      <div className="site-wrapper">
        <CodeSandbox
          Language='C++'
          Header={'Includes'}
          Code={Code}
          HeaderColor={'rgba(142, 129, 68, 0.1)'}
          MaxHeight={400}
        />

        <br></br>

         <CodeSandbox
          Language='HLSL'
          Header={'Bayer matrix shader'}
          Code={Bayer}
          HeaderColor={'rgba(143, 129, 68, 0.1)'}
          MaxHeight={400}
        />

        <br></br>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            overflow:"hidden",
            gap: '10px',
          }}>
          {projects.map((project) => {
            return <Project Data={project} />;
          })}
        </div>

        <br></br>

        <div style={{ width: '100%', maxWidth:"450px" }}>
          <ImageGallery Images={images} Header={'Images'} />
        </div>
      </div>

    </>
  );
}

export default App;
