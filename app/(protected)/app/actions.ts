"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import {
  saveActionSession,
  saveCheckin,
  signOut,
  updateProfile
} from "@/lib/repositories";
import { insertDemoDataForUser } from "@/lib/demo-data";
import type { ActionSessionInput, CheckinInput, MainGoal } from "@/types";

export async function signOutAction() {
  await signOut();
  redirect("/login");
}

export async function saveCheckinAction(input: CheckinInput) {
  const user = await requireUser();
  const checkin = await saveCheckin(user.id, input);
  revalidatePath("/app", "layout");
  return checkin;
}

export async function saveActionSessionAction(input: ActionSessionInput) {
  const user = await requireUser();
  const action = await saveActionSession(user.id, input);
  revalidatePath("/app", "layout");
  return action;
}

export async function updateProfileAction(input: {
  firstName?: string | null;
  mainGoal?: MainGoal | null;
  reminderEnabled?: boolean;
  reminderTime?: string;
}) {
  const user = await requireUser();
  const profile = await updateProfile(user.id, {
    firstName: input.firstName || null,
    mainGoal: input.mainGoal || null,
    reminderEnabled: input.reminderEnabled ?? true,
    reminderTime: input.reminderTime || "21:30"
  });
  revalidatePath("/app", "layout");
  return profile;
}

export async function loadDemoDataAction() {
  const user = await requireUser();
  const result = await insertDemoDataForUser(user.id);
  revalidatePath("/app", "layout");
  return result;
}
