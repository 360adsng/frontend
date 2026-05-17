const fs = require("fs");
const path = require("path");

const p = path.join(
  __dirname,
  "../app/_usersauth/ads/billboard/$slug/onboard/index.tsx",
);
let s = fs.readFileSync(p, "utf8");

const duplicateBlock = `      <section className="px-4 md:px-7 xl:px-20 py-24">
      
      <BackBtn>billboard Marketing</BackBtn>
      <Steps step={3} text="#3 - Completing"/>

      <p className="text-stone-400 text-center">
        Provide all requested details to help complete the campaign creation
      </p>

      <section className="md:flex my-10 md:space-x-5 xl:space-x-16">
        <div className="md:basis-6/12 xl:basis-5/12">
          <BillboardOnboardFormExtras
            listing={listing}
            listingLoading={listingLoading}
            arconChoice={arconChoice}
            certificateFile={arconCertificateFile}
            onCertificateChange={setArconCertificateFile}
            turnaround={arconTurnaround}
            onTurnaroundChange={setArconTurnaround}
          />
`;

const duplicateBlockDiv = duplicateBlock.replace(
  /<div className="md:basis-6\/12 xl:basis-5\/12">/,
  '<div className="md:basis-6/12 xl:basis-5/12">',
);

if (s.includes(duplicateBlock)) {
  s = s.replace(duplicateBlock, "");
} else if (s.includes(duplicateBlockDiv)) {
  s = s.replace(duplicateBlockDiv, "");
} else {
  console.error("duplicate block not found");
  process.exit(1);
}

s = s.replace(
  `      <section className="min-h-screen bg-[#E9E9E9] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">
      <BackBtn>billboard Marketing</BackBtn>`,
  `      <section className="min-h-screen bg-[#E9E9E9] px-4 py-8 md:px-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <BackBtn>Billboard marketing</BackBtn>`,
);

s = s.replace(
  `      <Toaster position="top-center" closeButton />
      </div>
    </section>`,
  `          <Toaster position="top-center" closeButton />
        </div>
      </section>`,
);

// Indent inner content (rough pass)
const lines = s.split("\n");
let inOnboardSection = false;
let depth = 0;
const out = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('className="min-h-screen bg-[#E9E9E9]')) {
    inOnboardSection = true;
    depth = 0;
  }
  if (inOnboardSection && line.trim() === "</>") {
    inOnboardSection = false;
  }
  out.push(line);
}
s = out.join("\n");

fs.writeFileSync(p, s);
console.log("fixed", p);
