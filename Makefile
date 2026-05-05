CV_PDF := rares-buhai-cv.pdf
CV_SRC := cv/main.tex
CV_BUILD_PDF := cv/main.pdf

.PHONY: cv cv-clean

cv: $(CV_PDF)

$(CV_PDF): $(CV_SRC)
	latexmk -pdf -interaction=nonstopmode -halt-on-error -output-directory=cv $(CV_SRC)
	cp $(CV_BUILD_PDF) $(CV_PDF)

cv-clean:
	latexmk -C -output-directory=cv $(CV_SRC)
