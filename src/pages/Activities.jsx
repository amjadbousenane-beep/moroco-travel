import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import AttractionCard from "@/components/shared/AttractionCard";
import { ATTRACTIONS, ACTIVITIES } from "@/data/attractions";
import { useLang } from "@/lib/i18n";
import useSeo from "@/lib/useSeo";

export default function Activities() {
  const { t } = useLang();
  useSeo({ title: "Things to Do in Morocco: Activities", description: "Sightseeing, hiking, beach and water sports, shopping and desert experiences across Morocco.", keywords: "Morocco activities, things to do in Morocco, hiking Morocco" });
  return (
    <>
      <PageHeader title={t("activitiesTitle")} sub={t("activitiesSub")} />
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 md:px-8">
        {ACTIVITIES.map((act) => {
          const items = ATTRACTIONS.filter((a) => a.act === act);
          if (!items.length) return null;
          return (
            <section key={act} id={act}>
              <h2 className="mb-6 text-4xl font-light">{t("a_" + act)}</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{items.map((a) => <AttractionCard key={a.city + a.slug} a={a} />)}</div>
            </section>
          );
        })}
      </div>
    </>
  );
}