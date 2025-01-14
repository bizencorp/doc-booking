import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const styles = StyleSheet.create({
  // SHARED CSS

  h1title: {
    fontFamily: "InterBold",
    fontSize: 22,
  },
  h2title: {
    fontFamily: "InterSemiBold",
    fontSize: 20,
  },
  h3title: {
    fontFamily: "InterSemiBold",
    fontSize: 18,
  },
  h4title: {
    fontFamily: "InterSemiBold",
    fontSize: 16,
  },
  title: {
    fontFamily: "InterSemiBold",
  },
  p: {
    fontFamily: "InterRegular",
    color: Colors.text,
  },

  line: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
  },
  wline: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
  },

  selectedTab: {
    left: 8,
    top: 8,
    bottom: 8,
    right: 8,
    height: "100%",
    width: "33.33%",
    position: "absolute",
    backgroundColor: Colors.tint,
    borderRadius: 50,
  },

  ratingChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    position: "absolute",
    right: 0,
    bottom: 0,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 6,
    backgroundColor: Colors.rating + "30",
  },
  // LOGIN PAGE UI

  appImage: {
    width: Dimensions.get("screen").width * 0.7,
    height: Dimensions.get("screen").height * 0.7,
    marginTop: Dimensions.get("screen").height * 0.08,
    borderColor: Colors.text,
    borderWidth: 3,
    borderRadius: 20,
  },
  imgContainer: {
    backgroundColor: Colors.tintGrey,
    borderWidth: 2,
    borderColor: Colors.border,
    width: "100%",
    alignItems: "center",
    borderRadius: 30,
    height: Dimensions.get("screen").height * 0.65,
  },
  heading: {
    objectFit: "cover",
    fontSize: 28,
    fontFamily: "InterBold",
    color: Colors.title,
  },
  headContainer: {
    backgroundColor: Colors.background,
    width: "100%",
    paddingTop: 25,
    alignItems: "center",
  },

  // PAGE HEADER
  pHead: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: "flex-end",
    height: 90,
    zIndex: 2,
    width: "100%",
  },
  pHeadwhite: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: "flex-end",
    height: 100,
    zIndex: 2,
    width: "100%",
    backgroundColor: Colors.background,
  },

  // HOSPITAL DETAILS PAGE

  categories: {
    backgroundColor: Colors.tintGrey,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    borderRadius: 20,
    color: Colors.text,
    fontFamily: "InterRegular",
  },
  rating: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    backgroundColor: Colors.green,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  infocard: {
    padding: 8,
    borderWidth: 1,
    height: 90,
    width: Dimensions.get("screen").width * 0.28,
    borderRadius: 16,
    justifyContent: "flex-end",
  },
  quickLink: {
    backgroundColor: Colors.tintGrey,
    width: "33%",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    paddingLeft: 12,
    paddingVertical: 14,
  },

  // BOOKING PAGE
  dates: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    alignItems: "center",
    borderRadius: 16,
    // borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.tintGrey,
  },
  selectedDT: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,
  },
  time: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: Colors.tintGrey,
  },

  // BOTTOM TAB BAR

  tabBar: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.tintGrey,
    // shadowColor: "#000000",
    // shadowOffset: { width: 0, height: 10 },
    // shadowRadius: 2,
    // shadowOpacity: 0.3,
    // elevation: 10,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },

  iconBar: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  // THANK YOU POP-UP

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000030",
  },
  modalView: {
    backgroundColor: Colors.background,
    width: Dimensions.get("screen").width * 0.65,
    height: Dimensions.get("screen").height * 0.3,
    borderRadius: 30,
    padding: 30,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  closeBtn: {
    position: "absolute",
    right: 15,
    top: 15,
    padding: 5,
    backgroundColor: Colors.tintGrey,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  // APPOINTMENT LIST PAGE

  status: {
    fontFamily: "Inter",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 50,
    position: "absolute",
    right: 0,
    bottom: 8,
  },

  // PATIENT PAGE
  patientCard:{
    padding:10,
    backgroundColor:Colors.background,
    borderRadius:20,
    marginBottom:10,
    flexDirection:"row",
    gap:8
  }
});







