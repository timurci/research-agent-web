const staticData = {
  traceId: crypto.randomUUID().slice(0, 8),
  suggestion: "You should start from the first paper",
  papers: [
    {
      title:
        "Social Media Use and Adolescent Mental Health: A Systematic Review",
      abstract:
        "This systematic review examines the association between social media engagement and mental health outcomes among adolescents aged 13–18. Analysis of 42 longitudinal studies reveals a small but significant correlation between daily platform use exceeding 3 hours and increased reported symptoms of anxiety and depression, moderated by individual factors such as sleep quality and offline social support.",
      authors: ["K. L. Roberts", "M. A. Chen"],
      url: "https://doi.org/10.1016/j.jadohealth.2024.03.001",
      isOpenAccess: true,
      doi: "10.1016/j.jadohealth.2024.03.001",
      pdfUrl: "https://arxiv.org/pdf/2403.001",
      publicationYear: 2024,
      citationCount: 87,
    },
    {
      title:
        "Passive Versus Active Social Media Use and Anxiety in Adolescents",
      abstract:
        "This study differentiates between passive (scrolling, viewing) and active (posting, interacting) social media use in a cohort of 1,200 adolescents aged 14–17. Passive use was associated with higher anxiety scores (β = 0.31, p < .001), while active use showed no significant association, suggesting that the mode of engagement mediates the psychological impact of social platforms.",
      authors: ["J. P. Thompson", "S. Rivera-Garcia"],
      url: "https://doi.org/10.1037/dev0001829",
      isOpenAccess: false,
      doi: null,
      pdfUrl: null,
      publicationYear: null,
      citationCount: null,
    },
  ],
};

export function mockResults(query) {
  console.log(`query: ${query}`);
  const delay = 1500 + Math.random() * 2500; // 1.5–4s
  return new Promise((resolve) => {
    setTimeout(() => resolve(staticData), delay);
  });
}
