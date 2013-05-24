# this shell script assumes all your json files are
# in a subdirectory called _todo/

for file in `find _todo/* -type f -maxdepth 1`
do
  echo "loading json for $file";
  python load_json.py $file;
done
