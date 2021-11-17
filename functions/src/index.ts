import * as functions from "firebase-functions";
import app from "./app";
export const express = functions.https.onRequest(app);