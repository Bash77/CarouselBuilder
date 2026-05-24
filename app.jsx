// app.jsx — wires the 3 directions into a DesignCanvas

const ART_W = 3280;
const ART_H = 410;

function App() {
  return (
    <DesignCanvas>
      <DCSection
        id="intro"
        title="Post 3 · The Logic"
        subtitle='"Engineers build the worst social media content" — 3 design directions, 10 slides each'
      >
        <DCArtboard
          id="editorial"
          label="A · Editorial Cream"
          width={ART_W}
          height={ART_H}
        >
          <EditorialCarousel />
        </DCArtboard>
      </DCSection>

      <DCSection
        id="split-section"
        title="Direction B"
        subtitle="Code panel ↔ editorial cream. The visual split IS the concept."
      >
        <DCArtboard
          id="split"
          label="B · Split System"
          width={ART_W}
          height={ART_H}
        >
          <SplitCarousel />
        </DCArtboard>
      </DCSection>

      <DCSection
        id="newsprint-section"
        title="Direction C"
        subtitle="Op-ed newsprint. Cormorant headlines, drop caps, two-column setting."
      >
        <DCArtboard
          id="newsprint"
          label="C · Newsprint Op-Ed"
          width={ART_W}
          height={ART_H}
        >
          <NewsprintCarousel />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
