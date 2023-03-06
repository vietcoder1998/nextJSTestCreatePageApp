"use client";

import Modal from "@/components/ui/Modal";
import { BannerLink } from "@/config/const";
import { Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./page.module.css";

interface Tag {
  label: string;
  value: string;
}

const imgList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
  (i) => BannerLink + ["banner", i].join("_") + ".jpg"
);

const defaultTagList: Tag[] = [
  { label: "Engineering", value: "engineering" },
  { label: "Production", value: "production" },
  { label: "Marketing", value: "marketing" },
  { label: "Design", value: "design" },
];

export default function Home() {
  const [showModal, setShowModal] = React.useState(false);
  const [imgLink, setImgLink] = React.useState<string>("");
  const [tagList, setTagList] = React.useState<
    { label: string; value: string }[]
  >([]);
  const imgBanner = React.useMemo(() => `url(${imgLink})`, [imgLink]);
  const onRemoveTagList = (value: string) => {
    const newTagList = tagList.filter((item) => item.value !== value);

    setTagList(newTagList);
  };

  const onAddTag = (value: string) => {
    const tag = defaultTagList.find((item) => item.value === value);
    const isContain = tagList.find((item) => item.value === value);

    if (!isContain && tag) {
      const newTagList = [...tagList, tag];
      setTagList(newTagList);
    }
  };

  const filterTagList: Tag[] = (() => {
    const valueList: string[] = tagList.map((item) => item.value);
    return (
      defaultTagList.filter((item) => !valueList.includes(item.value)) ?? []
    );
  })();

  const initialValues = {
    title:
      "Web3 Founders & Designers Mixer + fireside chat with Coinbase Senior Designer & Airfoil founder",
    startAt: new Date(),
    venue: "Chelsea Market (163 W 20nd Street). Manhattan, NYC",
    capacity: 50,
    price: 30,
    description:
      "Calling all web3 founders and designers for an exciting night of exchanging ideas and making new friends! Make friends with fellow designers and founders in web3. There will also be lots of insights to be gained through an intimate chat\n+Q&A with two giants in the industry: \n\nPhil Hedayatnia, Founder & CEO of Airfoil, a\ngrowth design studio that has designed and built products in web3, the creator economy,\nthe future of work, and much more for 80+ startups since 2018 \n\nJihoon Suh, Senior\nProduct Designer at Coinbase, who was previously Senior Product Designer for Messenger\nfor Meta. \n\nThis will be a curated group with limited spots, so do sign up early!\n\nAbout\nAirfoil: \n\nAirfoil Studio is the design, branding, and engineering team helping web3 take flight. As one of crypto’s first large-scale design firms, we aim to design a friendlier\nfinancial layer for the internet. We’re a team of 85+ creatives, working from Airfoil’s hubs in\nToronto, Singapore, and Seoul, who’ve worked on 100+ projects since 2018, including\nSolana Pay, Drift Protocol, Bonfida Solana Name Service, Utopia Labs, Planetarium,\nLayer3.xyz, MarginFi, Hyperspace, VBA Game, and more.\n\nLearn more about Airfoil and\nour work at airfoil.studio.",
    isManualApprove: true,
    privacy: "Public",
    banner:
      "https://supermomos-app-resourcesus.s3.amazonaws.com/Images/SocialBanner/banner_1.jpg",
    tags: [],
  };

  const onCloseImageBanner = () => {
    setImgLink("");
    setShowModal(false);
  };
  const onConfirm = () => {
    setShowModal(false);
  };

  const router = useRouter();

  return (
    <>
      <Modal
        visible={showModal}
        onClose={onCloseImageBanner}
        onConfirm={onConfirm}
      >
        <div style={{ padding: 10 }}>
          {imgList.map((img) => (
            <Image
              key={img}
              src={img}
              width={150}
              height={100}
              style={{ padding: 5 }}
              onClick={() => setImgLink(img)}
              alt={"banner" + img}
            />
          ))}
        </div>
      </Modal>
      {/* PageContent */}
      <Formik
        initialValues={initialValues}
        onSubmit={(event: any) => {
          const { values, actions } = event;
          fetch("https://api.supermomos-dev.com/interview/social", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              values,
              tags: tagList.map((item) => item.value),
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              router.push(`/landing-page/${res.id}`);
            })
            .catch((err) => {
              console.log(err);
            });

          actions.setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form id={"submitForm"} onSubmit={handleSubmit}>
            {/* Section Banner  */}
            <div className={styles.grid}>
              <div className={styles.col5}>
                <input
                  className={styles.formHeader}
                  defaultValue={"Untitle Event"}
                  name="title"
                />
                <div className={styles.eventDate}>
                  <div className={styles.grid} style={{ marginBottom: 25 }}>
                    <div
                      className={styles.col6}
                      style={{
                        display: "flex",
                        paddingRight: 24,
                        alignItems: "center",
                      }}
                    >
                      <span className="">
                        <Image
                          src={"/images/calendar.svg"}
                          alt={"calendar"}
                          width={33}
                          height={33}
                          className={styles.dateIcon}
                        />
                      </span>
                      <div className="input-group" id="datepicker">
                        <input
                          type="date"
                          className="form-control"
                          id="date"
                          placeholder="Date"
                          name="date"
                        />
                      </div>
                    </div>
                    <div
                      className={styles.col6}
                      style={{
                        display: "flex",
                        paddingRight: 24,
                        alignItems: "center",
                      }}
                    >
                      <span className="">
                        <Image
                          src={"/images/clock.svg"}
                          alt={"calendar"}
                          width={33}
                          height={33}
                          className={styles.dateIcon}
                        />
                      </span>
                      <div className="input-group date" id="datepicker">
                        <input
                          type="text"
                          className="form-control"
                          id="date"
                          placeholder="Time"
                          name="time-machinnne"
                          data-provide="datepicker"
                          list="time"
                        />
                      </div>
                      <datalist id="time">
                        {[
                          1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 7,
                          8, 9, 10, 11, 12,
                        ].map((item, index) => (
                          <option key={item} value={index}>
                            {[item, index > 12 ? "PM" : "AM"].join(":")}
                          </option>
                        ))}
                      </datalist>
                    </div>
                  </div>
                </div>
                <div className={styles.moreInfo}>
                  <div className={styles.grid}>
                    <div
                      className={styles.col12}
                      style={{
                        display: "flex",
                        marginBottom: 10,
                        paddingRight: 24,
                        alignItems: "center",
                      }}
                    >
                      <span className="">
                        <Image
                          src={"/images/environment.svg"}
                          alt={"calendar"}
                          width={33}
                          height={33}
                          className={styles.dateIcon}
                        />
                      </span>
                      <input
                        type={"text"}
                        className="form-control"
                        placeholder={"Venue"}
                        name="venue"
                      />
                    </div>
                    <div
                      className={styles.col6}
                      style={{
                        display: "flex",
                        paddingRight: 10,
                        alignItems: "center",
                      }}
                    >
                      <span className="">
                        <Image
                          src={"/images/group.svg"}
                          alt={"calendar"}
                          width={33}
                          height={33}
                          className={styles.dateIcon}
                        />
                      </span>
                      <input
                        type={"text"}
                        className="form-control"
                        name="capacity"
                        placeholder={"Max Capacity"}
                      />
                    </div>
                    <div
                      className={styles.col6}
                      style={{
                        display: "flex",
                        paddingRight: 24,
                        alignItems: "center",
                      }}
                    >
                      <span className="">
                        <Image
                          src={"/images/dollar.svg"}
                          alt={"calendar"}
                          width={33}
                          height={33}
                          className={styles.dateIcon}
                        />
                      </span>
                      <input
                        type={"text"}
                        className="form-control"
                        name="price"
                        placeholder={"Cost per person"}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={styles.col7}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  className={styles.addBanner}
                  style={{ backgroundImage: imgBanner }}
                >
                  <button
                    className={styles.addBannerLabel}
                    type="button"
                    onClick={() => setShowModal(true)}
                  >
                    <Image
                      src="/images/addbanner.png"
                      width={24}
                      height={22}
                      alt="addBaner"
                      style={{ marginRight: 16 }}
                    />{" "}
                    <label className={styles.addBannerText}>Add banner</label>
                  </button>
                </div>
              </div>
            </div>
            {/* Section Description*/}
            <div className={styles.grid}>
              <div className={styles.col6}>
                <p className={styles.descriptionHeader}>Description</p>
                <textarea
                  className={styles.inputArea}
                  placeholder="Description of your event..."
                  name="description"
                ></textarea>
              </div>
            </div>
            {/* Section Settings */}
            <div className={styles.grid}>
              <div className={styles.col6}>
                <div className={styles.settings}>
                  <p className={styles.settingHeader}>Settings</p>
                  <div className={styles.settingAprove}>
                    <input
                      type="checkbox"
                      name="isManualApprove"
                      id="isManualApprove"
                    />
                    <label
                      className={styles.settingInputLabel}
                      htmlFor="isManualApprove"
                    >
                      I want to approve attendees{" "}
                    </label>
                  </div>
                  <div className={styles.settingPrivacy}>
                    <p>Privacy</p>
                    <div className={styles.grid}>
                      <div className={styles.inputSettingPrivacy}>
                        <input
                          type={"radio"}
                          id={"privacy-0"}
                          name={"privacy"}
                        />{" "}
                        <label
                          className={styles.settingInputLabel}
                          htmlFor={"privacy-0"}
                        >
                          Public
                        </label>
                      </div>
                      <div className={styles.inputSettingPrivacy}>
                        <input
                          type={"radio"}
                          id={"privacy-1"}
                          name={"privacy"}
                        />{" "}
                        <label
                          className={styles.settingInputLabel}
                          htmlFor={"privacy-1"}
                        >
                          Curated Audience
                        </label>
                      </div>
                      <div className={styles.inputSettingPrivacy}>
                        <input
                          type={"radio"}
                          id={"privacy-2"}
                          name={"privacy"}
                        />{" "}
                        <label
                          className={styles.settingInputLabel}
                          htmlFor={"privacy-2"}
                        >
                          Community Only
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.settingTag}>
                    <div className={styles.settingTagHeader}>
                      <p>
                        <b>Tag your social</b>
                      </p>
                      <label className={styles.settingPickHeader}>
                        Pick tags for our curation engine to work its magin
                      </label>
                    </div>
                    <div className={styles.tagList}>
                      {tagList.map((item) => (
                        <button
                          type={"button"}
                          className={styles.tag}
                          key={item.value}
                          onClick={(e) => onRemoveTagList(item.value)}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                    <div className={styles.showTagList}>
                      {filterTagList.map((item) => (
                        <button
                          type={"button"}
                          className={styles.filterTag}
                          onClick={(e) => onAddTag(item.value)}
                          key={item.value}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className={styles.createSocialButton}>
              Create Social
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}
