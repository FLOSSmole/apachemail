# extract *.gz files
for file in `find _todo/*.gz -type f -maxdepth 1`
do
  echo "unzipping $file";
  gunzip $file;  
done

# rename files to .mbox
for file in `find _todo/* -type f -maxdepth 1`
do
  echo "renaming $file";
  mv "$file" "$file.mbox";
done

# run python program on each mbox file in turn
# redirect output and name it _json.out
for file in `find _todo/*.mbox -type f -maxdepth 1`
do
  echo "creating json for $file";
  python ../jsonify_mbox.py $file >> "${file}_json.out"
done