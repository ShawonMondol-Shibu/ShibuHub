import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import * as React from "react";

export default function Page() {
  const companies = [
    { name: "Apple", logo: "/images/apple.png" },
    { name: "Samsung", logo: "/images/Samsung.svg" },
    { name: "Sony", logo: "/images/Sony-Logo.png" },
    { name: "LG", logo: "/images/LG-Logo.png" },
    { name: "TCL", logo: "/images/T" },
    { name: "Anker", logo: "/images/anker.png" },
    { name: "Walton", logo: "/images/walton_logo.jpg" },
  ];
  return (
    <main className="py-10">
      <DynamicBreadcrumb />

      <section className="container m-auto px-6">
        <Card className="w-full max-w-max border-none shadow-none">
          <div className="flex flex-col md:flex-row items-center gap-10 p-5">
            <Image
              src={"/images/owner.jpg"}
              alt="shawon image"
              width={500}
              height={500}
              className="w-70 border shadow rounded-r-full"
            />
            <CardContent className="space-y-2 border shadow rounded-2xl py-5">
              <CardTitle className="text-2xl">
                Owner: Shawon Mondol Shibu
              </CardTitle>
              <p className="text-xl">Age: 21 years old</p>
              <p className="text-xl">Education: Diploma in Computer Engineer</p>
              <p className="text-xl">Nationality: Bangladeshi</p>
            </CardContent>
          </div>
        </Card>

        <div className="container">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.On the other hand,
            we denounce with righteous indignation and dislike men who are so
            beguiled and demoralized by the charms of pleasure of the moment, so
            blinded by desire, that they cannot foresee the pain and trouble
            that are bound to ensue; and equal blame belongs to those who fail
            in their duty through weakness of will, which is the same as saying
            through shrinking from toil and pain. These cases are perfectly
            simple and easy to distinguish. In a free hour, when our power of
            choice is untrammelled and when nothing prevents our being able to
            do what we like best, every pleasure is to be welcomed and every
            pain avoided. But in certain circumstances and owing to the claims
            of duty or the obligations of business it will frequently occur that
            pleasures have to be repudiated and annoyances accepted. The wise
            man therefore always holds in these matters to this principle of
            selection: he rejects pleasures to secure other greater pleasures,
            or else he endures pains to avoid worse pains.
          </p>

          <div className="flex flex-col md:flex-row items-center space-x-1">
            <Image
              src={"/images/Digitisation.jpg"}
              alt="shawon image"
              width={500}
              height={500}
            />
            <p className="">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.On the other hand, we denounce with righteous
              indignation and dislike men who are so beguiled and demoralized by
              the charms of pleasure of the moment, so blinded by desire, that
              they cannot foresee the pain and trouble that are bound to ensue;
              and equal blame belongs to those who fail in their duty through
              weakness of will, which is the same as saying through shrinking
              from toil and pain. These cases are perfectly simple and easy to
              distinguish. In a free hour, when our power of choice is
              untrammelled and when nothing prevents our being able to do what
              we like best, every pleasure is to be welcomed and every pain
              avoided. But in certain circumstances and owing to the claims of
              duty or the obligations of business it will frequently occur that
              pleasures have to be repudiated and annoyances accepted. The wise
              man therefore always holds in these matters to this principle of
              selection: he rejects pleasures to secure other greater pleasures,
              or else he endures pains to avoid worse pains.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center space-x-1">
            <p className="">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.On the other hand, we denounce with righteous
              indignation and dislike men who are so beguiled and demoralized by
              the charms of pleasure of the moment, so blinded by desire, that
              they cannot foresee the pain and trouble that are bound to ensue;
              and equal blame belongs to those who fail in their duty through
              weakness of will, which is the same as saying through shrinking
              from toil and pain. These cases are perfectly simple and easy to
              distinguish. In a free hour, when our power of choice is
              untrammelled and when nothing prevents our being able to do what
              we like best, every pleasure is to be welcomed and every pain
              avoided. But in certain circumstances and owing to the claims of
              duty or the obligations of business it will frequently occur that
              pleasures have to be repudiated and annoyances accepted. The wise
              man therefore always holds in these matters to this principle of
              selection: he rejects pleasures to secure other greater pleasures,
              or else he endures pains to avoid worse pains.
            </p>
            <Image
              src={"/images/coding.jpg"}
              alt="shawon image"
              width={500}
              height={500}
              // className="w-50 "
            />
          </div>
        </div>
      </section>
      <section className="mt-40">
        <h2 className="text-5xl text-center">Companys</h2>
        <div className="flex flex-wrap items-center justify-center gap-10 mt-10">
          {companies.map((image) => (
            <Image
              key={image.name}
              src={image.logo}
              alt={image.name}
              width={200}
              height={200}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
