export const importAll = (images) => {
  return Object.entries(images)
    .sort(([a], [b]) => {
      const getNum = (str) => {
        const match = str.match(/\((\d+)\)/);
        return match ? parseInt(match[1], 10) : 0;
      };
      return getNum(a) - getNum(b);
    })
    .map(([, value]) => value);
};

export const cyberImg = importAll(
  import.meta.glob("../assets/pro_img/cyber/*.{png,jpg,jpeg,svg}", { eager: true, import: "default" })
);

export const chatImg = importAll(
  import.meta.glob("../assets/pro_img/chat/*.{png,jpg,jpeg,svg}", { eager: true, import: "default" })
);

export const notesImg = importAll(
  import.meta.glob("../assets/pro_img/notes/*.{png,jpg,jpeg,svg}", { eager: true, import: "default" })
);

export const projectImg = importAll(
  import.meta.glob("../assets/pro_img/project/*.{png,jpg,jpeg,svg}", { eager: true, import: "default" })
);

export const analyticsImg = importAll(
  import.meta.glob("../assets/pro_img/analytics/*.{png,jpg,jpeg,svg}", { eager: true, import: "default" })
);

export const ticketImg = importAll(
  import.meta.glob("../assets/pro_img/ticket/*.{png,jpg,jpeg,svg}", { eager: true, import: "default" })
);

export const loanImg = importAll(
  import.meta.glob("../assets/pro_img/loan/*.{png,jpg,jpeg,svg}", { eager: true, import: "default" })
);

export const quizImg = importAll(
  import.meta.glob("../assets/pro_img/quiz/*.{png,jpg,jpeg,svg}", { eager: true, import: "default" })
);

