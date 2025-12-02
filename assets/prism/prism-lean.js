(function (Prism) {
  if (typeof Prism === 'undefined') {
    return;
  }

  var leanKeywords = /\b(?:theorem|lemma|def|structure|class|instance|inductive|fun|match|with|do|if|then|else|by|begin|end|where|open|import|namespace|section|variable|variables|universe|universes|abbrev|opaque|example|axiom|mutual|set_option|noncomputable|let|in|have|calc|simp|rw|rfl|intro|cases|apply|refine|exact|assumption|funext)\b/;

  Prism.languages.lean = {
    'comment': [
      { pattern: /\/-[\s\S]*?-\//, greedy: true },
      { pattern: /--.*/, greedy: true }
    ],
    'string': {
      pattern: /"(?:\\.|[^\\"])*"/,
      greedy: true
    },
    'number': /\b\d+(?:\.\d+)?\b/,
    'keyword': leanKeywords,
    'builtin': /\b(?:Prop|Type(?:\d+)?|Nat|Int|Real|Bool|ℝ|ℕ)\b/,
    'operator': /:=|=>|->|←|→|⟹|≥|≤|≠|⊢|∧|∨|¬|∘|=|[-+*/^]|[<>]=?|::/,
    'punctuation': /[{}[\];(),.]/
  };
})(Prism);
