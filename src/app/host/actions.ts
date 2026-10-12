"use server";

import { redirect } from "next/navigation";
import { requireHost } from "@/lib/auth";
import { getContent, updateContent } from "@/lib/content";
import type { SiteContent } from "@/data/house";

// Every host edit goes through here: check the host is signed in, apply the
// change to the latest content, save it, then send them back with a message.

const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim();
const lines = (form: FormData, key: string) =>
  text(form, key)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
const photos = (form: FormData) => form.getAll("photos").map(String).filter(Boolean);

async function save(change: (c: SiteContent) => void, backTo: string) {
  try {
    await requireHost();
    await updateContent(change);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    redirect(`${backTo}?error=${encodeURIComponent(message)}`);
  }
  redirect(`${backTo}?saved=1`);
}

function slugify(name: string, taken: string[]) {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "item";
  let slug = base;
  for (let i = 2; taken.includes(slug); i++) slug = `${base}-${i}`;
  return slug;
}

// ---- General & essentials ----

export async function saveGeneral(form: FormData) {
  await save((c) => {
    c.house = { name: text(form, "houseName"), welcome: text(form, "welcome") };
    c.host = {
      name: text(form, "hostName"),
      phone: text(form, "hostPhone"),
      email: text(form, "hostEmail"),
      responseNote: text(form, "responseNote"),
    };
    c.essentials = {
      parking: text(form, "parking"),
      doorLock: { code: text(form, "doorCode"), instructions: text(form, "doorInstructions") },
      wifi: { network: text(form, "wifiNetwork"), password: text(form, "wifiPassword") },
      checkoutTime: text(form, "checkoutTime"),
      checkoutChecklist: lines(form, "checkoutChecklist"),
      quietHours: text(form, "quietHours"),
    };
  }, "/host/general");
}

// ---- Tour stops ----

export async function saveStop(form: FormData) {
  const id = text(form, "id");
  await save((c) => {
    const stop = c.tourStops.find((s) => s.id === id);
    if (!stop) throw new Error("That tour stop no longer exists.");
    stop.title = text(form, "title");
    stop.emoji = text(form, "emoji");
    stop.summary = text(form, "summary");
    stop.details = lines(form, "details");
    stop.photos = photos(form);
  }, `/host/stops/${id}`);
}

// ---- Devices ----

export async function saveDevice(form: FormData) {
  const id = text(form, "id");
  const stopId = text(form, "stopId");
  await save((c) => {
    const device = c.appliances.find((a) => a.id === id);
    if (!device) throw new Error("That device no longer exists.");
    device.name = text(form, "name");
    device.emoji = text(form, "emoji");
    device.summary = text(form, "summary");
    device.location = text(form, "location");
    device.suppliesLocation = text(form, "suppliesLocation");
    device.steps = lines(form, "steps");
    device.troubleshooting = lines(form, "troubleshooting");
    device.tips = lines(form, "tips");
    device.photos = photos(form);
    // A device appears on at most one tour stop.
    for (const stop of c.tourStops) {
      stop.applianceIds = stop.applianceIds.filter((a) => a !== id);
      if (stop.id === stopId) stop.applianceIds.push(id);
    }
  }, `/host/devices/${id}`);
}

export async function createDevice(form: FormData) {
  const name = text(form, "name") || "New device";
  const { appliances } = await getContent();
  const id = slugify(name, appliances.map((a) => a.id));
  await save((c) => {
    c.appliances.push({
      id,
      name,
      emoji: "🔌",
      summary: "",
      location: "",
      suppliesLocation: "",
      steps: [],
      troubleshooting: [],
      photos: [],
    });
  }, `/host/devices/${id}`);
}

export async function deleteDevice(form: FormData) {
  const id = text(form, "id");
  await save((c) => {
    c.appliances = c.appliances.filter((a) => a.id !== id);
    for (const stop of c.tourStops) stop.applianceIds = stop.applianceIds.filter((a) => a !== id);
  }, "/host");
}

// ---- Activities ----

export async function saveActivity(form: FormData) {
  const id = text(form, "id");
  await save((c) => {
    const activity = c.activities.find((a) => a.id === id);
    if (!activity) throw new Error("That activity no longer exists.");
    activity.name = text(form, "name");
    activity.emoji = text(form, "emoji");
    activity.summary = text(form, "summary");
    activity.details = lines(form, "details");
    activity.photos = photos(form);
  }, `/host/activities/${id}`);
}

export async function createActivity(form: FormData) {
  const name = text(form, "name") || "New activity";
  const { activities } = await getContent();
  const id = slugify(name, activities.map((a) => a.id));
  await save((c) => {
    c.activities.push({ id, name, emoji: "✨", summary: "", details: [], photos: [] });
  }, `/host/activities/${id}`);
}

export async function deleteActivity(form: FormData) {
  const id = text(form, "id");
  await save((c) => {
    c.activities = c.activities.filter((a) => a.id !== id);
  }, "/host");
}

// ---- FAQ ----

export async function saveFaqs(form: FormData) {
  const questions = form.getAll("question").map((q) => String(q).trim());
  const answers = form.getAll("answer").map((a) => String(a).trim());
  await save((c) => {
    // Clearing a question removes it.
    c.faqs = questions.map((question, i) => ({ question, answer: answers[i] ?? "" })).filter((f) => f.question);
  }, "/host/faq");
}
