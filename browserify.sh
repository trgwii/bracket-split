echo -e "(function (global, module) {\n" > bracketSplit.js
cat index.js >> bracketSplit.js
cat << EOF >> bracketSplit.js

global.bracketSplit = module.exports;

})(typeof window === 'undefined' ? typeof global === 'undefined' ? this : global : window, {});
EOF
