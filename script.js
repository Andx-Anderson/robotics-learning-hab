const revealItems = document.querySelectorAll(".reveal");
const cursorReticle = document.querySelector(".cursor-reticle");
const processCenter = document.querySelector(".cycle-center");
const centerStepNum = document.querySelector("#center-step-num");
const centerStepTitle = document.querySelector("#center-step-title");
const centerStepCopy = document.querySelector("#center-step-copy");
const stepButtons = document.querySelectorAll(
  ".step-list .step-row[data-step]",
);
const orbitSteps = document.querySelectorAll(
  ".cycle-step[data-step-orbit]",
);
let processStepTimer;

const processSteps = [
  {
    number: "1",
    title: "Identify the Problem",
    description:
      "Engineers begin by clearly stating the task the robot must complete and what success will look like.",
  },
  {
    number: "2",
    title: "Research the Problem",
    description:
      "They gather information about user needs, science concepts, safety issues, and similar robotics systems.",
  },
  {
    number: "3",
    title: "Brainstorm Solutions",
    description:
      "Teams compare possible designs and choose features that best meet the robot's goals.",
  },
  {
    number: "4",
    title: "Build a Prototype",
    description:
      "A prototype turns the idea into something real that can be tested with hardware and software.",
  },
  {
    number: "5",
    title: "Test the Prototype",
    description:
      "Testing shows whether the robot works correctly and reveals weak points in the design.",
  },
  {
    number: "6",
    title: "Improve (Iterate)",
    description:
      "Engineers repeat the cycle to refine the robot until it performs more safely and effectively.",
  },
];

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  },
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 40, 280)}ms`;
  revealObserver.observe(item);
});

const setActiveProcessStep = (stepNumber) => {
  const step = processSteps[stepNumber - 1];
  if (
    !step ||
    !processCenter ||
    !centerStepNum ||
    !centerStepTitle ||
    !centerStepCopy
  ) {
    return;
  }

  stepButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      Number(button.dataset.step) === stepNumber,
    );
  });

  orbitSteps.forEach((item) => {
    item.classList.toggle(
      "active",
      Number(item.dataset.stepOrbit) === stepNumber,
    );
  });

  processCenter.classList.add("is-switching");
  clearTimeout(processStepTimer);

  processStepTimer = window.setTimeout(() => {
    centerStepNum.textContent = step.number;
    centerStepTitle.textContent = step.title;
    centerStepCopy.textContent = step.description;
    processCenter.classList.remove("is-switching");
  }, 140);
};

stepButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveProcessStep(Number(button.dataset.step));
  });
});

setActiveProcessStep(1);

if (cursorReticle && window.matchMedia("(pointer: fine)").matches) {
  let clickTimer;

  window.addEventListener("mousemove", (event) => {
    cursorReticle.style.left = `${event.clientX}px`;
    cursorReticle.style.top = `${event.clientY}px`;
    cursorReticle.classList.add("visible");
  });

  window.addEventListener("mousedown", () => {
    cursorReticle.classList.add("is-clicked");
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      cursorReticle.classList.remove("is-clicked");
    }, 140);
  });

  window.addEventListener("mouseup", () => {
    cursorReticle.classList.remove("is-clicked");
  });

  window.addEventListener("mouseleave", () => {
    cursorReticle.classList.remove("visible");
    cursorReticle.classList.remove("is-clicked");
  });
}