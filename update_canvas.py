import re

with open('components/simulation/SimulationCanvas.tsx', 'r') as f:
    content = f.read()

config = """
const CANVAS_CONFIG = {
  padL: 50,
  padR: 20,
  padT: 20,
  padB: 40,
  xMin: -3,
  xMax: 3,
  yMin: -1.5,
  yMax: 12,
};

export default function SimulationCanvas() {"""

content = content.replace("export default function SimulationCanvas() {", config)

old_vars = """    const padL = 50, padR = 20, padT = 20, padB = 40;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;

    const xMin = -3, xMax = 3;
    const yMin = -1.5, yMax = 12;"""

new_vars = """    const { padL, padR, padT, padB, xMin, xMax, yMin, yMax } = CANVAS_CONFIG;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;"""

content = content.replace(old_vars, new_vars)

with open('components/simulation/SimulationCanvas.tsx', 'w') as f:
    f.write(content)
